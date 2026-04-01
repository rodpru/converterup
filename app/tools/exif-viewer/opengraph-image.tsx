import { generateOgImage, ogSize, ogContentType } from "@/lib/og-image";

export const alt = "EXIF Data Viewer & Remover — ConverterUp";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OgImage() {
	return generateOgImage({
		title: "EXIF Data Viewer & Remover",
		badge: "Image",
	});
}
