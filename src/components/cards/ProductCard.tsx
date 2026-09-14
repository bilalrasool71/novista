import { Card, CardAction, CardBody, CardIcon, CardTitle } from "@/components/ui/Card";
import { PlatformPreview, previewForProduct } from "@/components/visuals/previews";
import type { Product } from "@/content/products";

export function ProductCard({
  product,
  showMockup = true,
}: {
  product: Product;
  /** Off where the grid is dense enough that a mockup per card is noise. */
  showMockup?: boolean;
}) {
  return (
    <Card href={`/products/${product.slug}`} padded={false}>
      {showMockup ? (
        <div className="bg-surface-2 border-line rounded-t-2xl border-b p-4">
          <PlatformPreview
            kind={previewForProduct(product.slug)}
            title={product.name}
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <CardIcon icon={product.icon} className="size-10" />
          <span className="bg-surface-2 text-muted border-line shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium">
            {product.status}
          </span>
        </div>
        <CardTitle className="mt-4">{product.name}</CardTitle>
        <CardBody className="mt-2">{product.tagline}</CardBody>
        <CardAction>Details</CardAction>
      </div>
    </Card>
  );
}
