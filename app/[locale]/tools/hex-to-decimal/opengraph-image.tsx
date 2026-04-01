import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Hex to Decimal Converter — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "Hex to Decimal Converter",
		badge: "Developer",
	});
}
