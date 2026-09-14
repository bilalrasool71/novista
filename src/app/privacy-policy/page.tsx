import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact, site } from "@/content/site";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

/**
 * This policy describes what this website actually does today: a contact form,
 * optional analytics, and nothing else. If you add a CRM, a newsletter, a chat
 * widget, embedded video or any third-party script, update this page at the
 * same time — and have it reviewed against the privacy law that applies where
 * you and your clients operate before relying on it.
 */

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Novista Solutions collects, uses and protects personal information submitted through novista.io.";

/** Bump whenever the policy text changes. */
const UPDATED_AT = "2026-09-14";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/privacy-policy",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalPage
        title={TITLE}
        intro={`How ${site.name} handles personal information collected through ${site.domain}.`}
        updatedAt={UPDATED_AT}
        crumbs={crumbs}
      >
        <h2>The short version</h2>
        <p>
          We collect the details you choose to send us through the contact form,
          and we use them only to reply to your enquiry and to discuss possible
          work. We do not sell your data, we do not share it with advertisers, and
          we will not add you to a marketing list without you asking us to.
        </p>

        <h2>Who we are</h2>
        <p>
          {site.legalName} operates this website. For any question about this
          policy or about data we hold, contact us at{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>

        <h2>What we collect</h2>

        <h3>Information you give us</h3>
        <p>
          When you submit the contact form we receive the name, company, email
          address, phone number (if you provide one), the service area you
          selected, the budget range you selected (if any) and the project details
          you wrote. If you email us directly, we receive whatever your message
          contains.
        </p>

        <h3>Information collected automatically</h3>
        <p>
          Our hosting provider records standard server logs, which include IP
          addresses and request details. These are used to operate the site
          securely — for example to rate-limit the contact form against automated
          abuse — and are retained only for as long as that purpose requires.
        </p>
        <p>
          If website analytics is enabled, it collects aggregated usage data such
          as pages visited, approximate location derived from IP address, device
          type and referral source. Analytics is configured to measure how the
          site is used, not to identify individual visitors.
        </p>

        <h2>Cookies</h2>
        <p>
          This website does not use cookies for advertising, profiling or
          cross-site tracking. If analytics is enabled, the analytics provider may
          set cookies to distinguish between visits. You can block or delete
          cookies in your browser settings; the site works normally without them.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>To reply to your enquiry and to discuss a possible project.</li>
          <li>To prepare proposals, scopes and estimates you have asked for.</li>
          <li>To provide services under an agreement, if we go on to work together.</li>
          <li>To keep the website secure and prevent automated abuse.</li>
          <li>To meet legal, accounting and regulatory obligations.</li>
        </ul>
        <p>
          We do not use your information to make automated decisions that produce
          legal or similarly significant effects.
        </p>

        <h2>Legal basis</h2>
        <p>
          Where data protection law requires a legal basis, we rely on your
          consent when you choose to submit the form, on our legitimate interest
          in responding to business enquiries and operating a secure website, on
          performance of a contract once we are working together, and on legal
          obligation where records must be retained.
        </p>

        <h2>Who we share it with</h2>
        <p>
          We do not sell or rent personal information. We share it only with
          service providers that operate this website and our business
          communications — for example our hosting provider, our email delivery
          provider and, if enabled, our analytics provider. These providers act on
          our instructions and are not permitted to use your information for their
          own purposes. We may also disclose information where we are legally
          required to.
        </p>
        <p>
          Some of these providers operate internationally, which means your
          information may be processed outside your country. Where that happens we
          rely on the provider&apos;s contractual safeguards for international
          transfers.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Enquiries that do not lead to work are kept for up to 24 months, so we
          have context if you come back to us, and then deleted. If we go on to
          work together, project and contract records are kept for as long as the
          relationship lasts and afterwards for the period required by tax and
          legal obligations. Server logs are kept for a short operational period.
        </p>

        <h2>How we protect it</h2>
        <p>
          The site is served over HTTPS with security headers including a content
          security policy. Form submissions are validated and rate-limited on the
          server, and credentials for third-party services are held in environment
          variables and never exposed in the browser. Access to enquiry data is
          limited to the people who need it to reply to you.
        </p>
        <p>
          No transmission over the internet is completely secure, so please do not
          send passwords, payment card details or other sensitive credentials
          through the contact form.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access the
          personal information we hold about you, to have it corrected or deleted,
          to object to or restrict how we use it, to receive a copy in a portable
          format, and to withdraw consent at any time. To exercise any of these,
          email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a> and we will
          respond within the period required by the law that applies to you. You
          also have the right to complain to your local data protection authority.
        </p>

        <h2>Children</h2>
        <p>
          This is a business website and is not directed at children. We do not
          knowingly collect personal information from anyone under 16.
        </p>

        <h2>Links to other sites</h2>
        <p>
          This site may link to websites we do not operate. We are not responsible
          for their content or their privacy practices, and we encourage you to
          read their policies.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change this policy we will update the date at the top of this
          page. Where a change is significant we will make that clear rather than
          relying on you to notice.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy, or about information we hold? Email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </LegalPage>

      <JsonLd
        data={[
          webPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: "/privacy-policy",
          }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}
