import { ArrowRight, Code2, ImageIcon, RefreshCw } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

type Category = "image" | "convert" | "dev";

const TOOLS: { slug: string; category: Category }[] = [
  { slug: "image-compressor", category: "image" },
  { slug: "image-resizer", category: "image" },
  { slug: "color-palette", category: "image" },
  { slug: "exif-viewer", category: "image" },
  { slug: "video-to-gif", category: "convert" },
  { slug: "svg-to-png", category: "convert" },
  { slug: "favicon-generator", category: "convert" },
  { slug: "image-to-base64", category: "convert" },
  { slug: "json-viewer", category: "dev" },
  { slug: "uuid-generator", category: "dev" },
  { slug: "hex-to-decimal", category: "dev" },
  { slug: "csv-to-json", category: "dev" },
];

const CATEGORY_META: Record<
  Category,
  { labelKey: string; icon: typeof ImageIcon }
> = {
  image: { labelKey: "categoryImage", icon: ImageIcon },
  convert: { labelKey: "categoryConvert", icon: RefreshCw },
  dev: { labelKey: "categoryDev", icon: Code2 },
};

const CATEGORY_ORDER: Category[] = ["image", "convert", "dev"];

function toolDisplayName(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("Json", "JSON")
    .replace("Csv", "CSV")
    .replace("Uuid", "UUID")
    .replace("Svg", "SVG")
    .replace("Png", "PNG")
    .replace("Exif", "EXIF")
    .replace("Hex", "Hex");
}

export async function PopularTools({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "PopularTools" });
  const tMeta = await getTranslations({ locale, namespace: "ToolHowTo" });

  function safeTagline(slug: string): string {
    try {
      return tMeta(`${slug}.description`);
    } catch {
      return "";
    }
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 sm:py-28 border-t border-[#2A2535]/50">
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-[#2DD4BF] mb-4">
          {t("badge")}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-[Syne] font-bold text-[#EDEDEF] mb-4">
          {t("heading")}
        </h2>
        <p className="text-[#A1A1AA] font-[Inter] text-base sm:text-lg leading-relaxed">
          {t("subheading")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {CATEGORY_ORDER.map((cat) => {
          const { labelKey, icon: Icon } = CATEGORY_META[cat];
          const items = TOOLS.filter((tool) => tool.category === cat);
          return (
            <div
              key={cat}
              className="border border-[#2A2535] rounded-xl bg-[#16131E]/50 p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Icon className="w-4 h-4 text-[#2DD4BF]" />
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#71717A]">
                  {t(labelKey)}
                </h3>
              </div>
              <ul className="space-y-3">
                {items.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="block group rounded-lg -mx-2 px-2 py-2 hover:bg-[#2A2535]/40 transition-colors"
                    >
                      <span className="block text-sm font-[Syne] font-semibold text-[#EDEDEF] group-hover:text-[#2DD4BF] transition-colors">
                        {toolDisplayName(tool.slug)}
                      </span>
                      <span className="block text-xs text-[#71717A] font-[Inter] mt-0.5 leading-snug">
                        {safeTagline(tool.slug)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-[#2A2535] text-[#EDEDEF] font-mono text-xs uppercase tracking-wider hover:border-[#2DD4BF]/40 hover:text-[#2DD4BF] transition-colors min-h-[44px]"
        >
          {t("viewAll")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
