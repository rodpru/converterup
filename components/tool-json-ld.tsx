import { JsonLd } from "@/components/json-ld";
import { getToolHowToSchema } from "@/lib/tool-schemas";

export function ToolJsonLd({ slug }: { slug: string }) {
  const howToSchema = getToolHowToSchema(slug);
  if (!howToSchema) return null;
  return <JsonLd data={howToSchema} />;
}
