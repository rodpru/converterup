import { JsonLd } from "@/components/json-ld";
import { getToolHowToSchema } from "@/lib/tool-schemas";

export async function ToolJsonLd({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const howToSchema = await getToolHowToSchema(slug, locale);
  if (!howToSchema) return null;
  return <JsonLd data={howToSchema} />;
}
