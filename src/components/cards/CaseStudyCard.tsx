import { Card, CardAction, CardBody, CardChips, CardTitle } from "@/components/ui/Card";
import { PlatformPreview, type PreviewKind } from "@/components/visuals/previews";
import type { CaseStudy } from "@/content/case-studies";

/**
 * The header is a generated UI illustration rather than a screenshot: we
 * would rather show an honest abstraction than a mocked-up interface
 * implying a product shot we do not have.
 */
const PREVIEW_BY_INDEX: PreviewKind[] = ["roster", "checkout", "agent", "chart"];

export function CaseStudyCard({
  study,
  index = 0,
}: {
  study: CaseStudy;
  index?: number;
}) {
  return (
    <Card href={`/case-studies/${study.slug}`} as="article" padded={false}>
      <div className="bg-surface-2 border-line rounded-t-2xl border-b p-4">
        <PlatformPreview
          kind={PREVIEW_BY_INDEX[index % PREVIEW_BY_INDEX.length]}
          title={study.industry}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-surface-2 text-accent-2 rounded-full px-2.5 py-1 text-xs font-semibold">
            {study.industry}
          </span>
          {study.isPlaceholder ? (
            <span className="rounded-full border-notice-line bg-notice border px-2.5 py-1 text-xs font-semibold text-notice-ink">
              Illustrative
            </span>
          ) : null}
        </div>

        <CardTitle className="mt-4">{study.title}</CardTitle>
        <CardBody className="mt-2">{study.summary}</CardBody>
        <CardChips items={study.technologies.slice(0, 4)} />
        <CardAction>Read the case study</CardAction>
      </div>
    </Card>
  );
}
