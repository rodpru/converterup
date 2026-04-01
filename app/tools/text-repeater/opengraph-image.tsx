import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "Text Repeater — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "Text Repeater",
		badge: "Utility",
	});
}
