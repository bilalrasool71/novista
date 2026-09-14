import { NextResponse } from "next/server";

import { contact, site } from "@/content/site";
import { looksAutomated, validateContact } from "@/lib/contact";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * Contact form endpoint.
 *
 * Order matters: cheap rejections first (size, shape, rate limit, spam traps)
 * so abuse never reaches validation or an outbound request.
 *
 * Delivery is configured through environment variables and degrades safely:
 *   RESEND_API_KEY + CONTACT_TO_EMAIL  -> email
 *   CONTACT_WEBHOOK_URL                -> POST the submission as JSON
 *   neither                            -> log to the server console
 *
 * The visitor always gets the same response either way; a delivery
 * misconfiguration is our problem to see in the logs, not theirs to debug.
 */

export const runtime = "nodejs";
/** Never cached, never prerendered — it only ever handles POSTs. */
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: Request) {
  const headers = request.headers;

  // 1. Reject oversized payloads before reading the body.
  const declaredLength = Number(headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "That message is too long to send through this form." },
      { status: 413 },
    );
  }

  if (!headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ message: "Unsupported content type." }, { status: 415 });
  }

  // 2. Rate limit per client: 5 submissions per 10 minutes.
  const limit = rateLimit(`contact:${clientKey(headers)}`);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        message: `Too many messages sent from this connection. Please try again in a few minutes, or email ${contact.email} directly.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Could not read that request." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ message: "Could not read that request." }, { status: 400 });
  }

  const input = payload as Record<string, unknown>;

  // 3. Spam traps. Respond as if accepted so bots get no signal to adapt.
  if (looksAutomated(input)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 4. Validate. Never trust what the browser already checked.
  const result = validateContact(input);
  if (!result.ok) {
    return NextResponse.json(
      { message: "Please check the highlighted fields.", errors: result.errors },
      { status: 400 },
    );
  }

  const submission = {
    ...result.value,
    receivedAt: new Date().toISOString(),
    source: site.url,
  };

  try {
    await deliver(submission);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      {
        message: `We could not send that just now. Please email ${contact.email} directly and we will pick it up.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

type Submission = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  receivedAt: string;
  source: string;
};

async function deliver(submission: Submission) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? contact.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (resendKey && toEmail && fromEmail) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} Website <${fromEmail}>`,
        to: [toEmail],
        // So a reply from the inbox goes straight back to the enquirer.
        reply_to: submission.email,
        subject: `New enquiry: ${submission.company} — ${submission.service}`,
        text: asPlainText(submission),
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
    }
    return;
  }

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded ${response.status}`);
    }
    return;
  }

  // No delivery configured. Log it so nothing is silently lost in development.
  console.info(
    "[contact] No delivery configured (set RESEND_API_KEY + CONTACT_TO_EMAIL + " +
      "CONTACT_FROM_EMAIL, or CONTACT_WEBHOOK_URL). Submission:\n" +
      asPlainText(submission),
  );
}

function asPlainText(submission: Submission): string {
  return [
    `Name:     ${submission.name}`,
    `Company:  ${submission.company}`,
    `Email:    ${submission.email}`,
    `Phone:    ${submission.phone || "—"}`,
    `Service:  ${submission.service}`,
    `Budget:   ${submission.budget || "Not specified"}`,
    `Received: ${submission.receivedAt}`,
    "",
    "Project details:",
    submission.message,
  ].join("\n");
}
