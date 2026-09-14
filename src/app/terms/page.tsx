import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { contact, site } from "@/content/site";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";

/**
 * These terms govern use of the website only. They deliberately do not attempt
 * to govern client engagements — those are covered by the signed agreement for
 * each project. Have these reviewed against the law of your jurisdiction
 * before relying on them.
 */

const TITLE = "Terms & Conditions";
const DESCRIPTION =
  "The terms that apply to your use of the Novista Solutions website, including intellectual property, acceptable use and limitation of liability.";

/** Bump whenever the terms change. */
const UPDATED_AT = "2026-09-14";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/terms",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms & Conditions", path: "/terms" },
];

export default function TermsPage() {
  return (
    <>
      <LegalPage
        title={TITLE}
        intro={`These terms apply to your use of ${site.domain}. Project work is governed separately by the written agreement we sign for that engagement.`}
        updatedAt={UPDATED_AT}
        crumbs={crumbs}
      >
        <h2>1. About these terms</h2>
        <p>
          This website is operated by {site.legalName}. By using it you agree to
          these terms. If you do not agree with them, please do not use the site.
        </p>
        <p>
          These terms cover the website only. They do not govern any project we
          carry out for you — that is set out in a separate written agreement,
          and where the two conflict, that agreement takes precedence.
        </p>

        <h2>2. Use of the website</h2>
        <p>You may use this site for lawful purposes. You agree not to:</p>
        <ul>
          <li>Use it in any way that breaches applicable law or regulation.</li>
          <li>
            Attempt to gain unauthorised access to the site, its servers, or any
            connected system.
          </li>
          <li>
            Introduce malicious code, or attempt to interfere with the site&apos;s
            normal operation.
          </li>
          <li>
            Use automated means to scrape or harvest content, or to submit the
            contact form.
          </li>
          <li>
            Submit false information, or content that is unlawful, defamatory or
            infringes someone else&apos;s rights.
          </li>
        </ul>

        <h2>3. Intellectual property</h2>
        <p>
          The content of this website — including text, design, graphics, layout
          and the {site.shortName} name and logo — belongs to {site.legalName} or
          its licensors and is protected by intellectual property law.
        </p>
        <p>
          You may view, download and print pages for your own reference or for
          legitimate business evaluation. You may not republish, sell, or use our
          content commercially without written permission. Quoting a short extract
          with clear attribution and a link back is fine.
        </p>
        <p>
          Product names, logos and trademarks belonging to other organisations and
          referenced on this site remain the property of their respective owners,
          and their appearance here does not imply any endorsement or partnership
          unless we say so explicitly.
        </p>

        <h2>4. Information on this site</h2>
        <p>
          We publish this site in good faith and keep it current, but content is
          provided for general information. It is not professional, technical or
          legal advice, and you should not rely on it alone when making a business
          decision. Any timeframes, capabilities or approaches described here are
          indicative — what applies to your project will be set out in a written
          proposal.
        </p>
        <p>
          Case studies marked as illustrative describe the kind of work we do and
          are not accounts of specific client engagements.
        </p>

        <h2>5. Enquiries and proposals</h2>
        <p>
          Submitting the contact form does not create a contract or oblige either
          of us to proceed. Nothing on this website constitutes an offer capable
          of acceptance. A project begins only when both parties sign a written
          agreement covering scope, timeline, cost and terms.
        </p>

        <h2>6. Availability</h2>
        <p>
          We aim to keep the site available and accurate, but we do not guarantee
          uninterrupted access. We may change, suspend or withdraw any part of it
          without notice, including while we carry out maintenance.
        </p>

        <h2>7. External links</h2>
        <p>
          Where we link to other websites, we do so for information only. We do
          not control them and are not responsible for their content, accuracy or
          practices.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {site.legalName} is not liable
          for any loss of profit, loss of business, business interruption, or loss
          of data arising from your use of, or inability to use, this website.
        </p>
        <p>
          Nothing in these terms excludes or limits our liability for death or
          personal injury caused by negligence, for fraud or fraudulent
          misrepresentation, or for any other liability that cannot be excluded
          under applicable law.
        </p>

        <h2>9. Privacy</h2>
        <p>
          How we handle personal information is set out in our{" "}
          <a href="/privacy-policy">Privacy Policy</a>, which forms part of these
          terms.
        </p>

        <h2>10. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The version published here
          is the one that applies, and the date at the top of this page shows when
          it last changed.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </LegalPage>

      <JsonLd
        data={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/terms" }),
          breadcrumbSchema(crumbs),
        ]}
      />
    </>
  );
}
