interface HowToStep {
  name: string;
  text: string;
}

interface ToolSchema {
  name: string;
  description: string;
  steps: HowToStep[];
  category: "MultimediaApplication" | "UtilityApplication" | "DeveloperApplication";
}

const toolSchemas: Record<string, ToolSchema> = {
  "image-compressor": {
    name: "How to Compress Images Online",
    description: "Compress PNG, JPG, WebP, and AVIF images to reduce file size while preserving quality.",
    steps: [
      { name: "Upload your image", text: "Drag and drop or click to select a PNG, JPG, WebP, or AVIF image from your device." },
      { name: "Adjust compression quality", text: "Use the quality slider to set your desired compression level. Preview the result in real time." },
      { name: "Download the compressed image", text: "Click download to save the compressed image. The file never leaves your browser." },
    ],
    category: "MultimediaApplication",
  },
  "image-resizer": {
    name: "How to Resize Images Online",
    description: "Resize images to exact dimensions or percentages with aspect ratio control.",
    steps: [
      { name: "Upload your image", text: "Drag and drop or click to select an image from your device." },
      { name: "Set the desired dimensions", text: "Enter width and height in pixels or percentage. Toggle aspect ratio lock as needed." },
      { name: "Download the resized image", text: "Click download to save the resized image to your device." },
    ],
    category: "MultimediaApplication",
  },
  "video-to-gif": {
    name: "How to Convert Video to GIF Online",
    description: "Convert MP4, WebM, MOV, and AVI videos to animated GIF format.",
    steps: [
      { name: "Upload your video", text: "Drag and drop or select an MP4, WebM, MOV, or AVI video file." },
      { name: "Configure GIF settings", text: "Adjust frame rate, width, and select the portion of the video to convert." },
      { name: "Download the GIF", text: "Click convert and download your animated GIF file." },
    ],
    category: "MultimediaApplication",
  },
  "qr-code-generator": {
    name: "How to Generate a QR Code Online",
    description: "Create custom QR codes with custom colors, sizes, and error correction levels.",
    steps: [
      { name: "Enter your content", text: "Type or paste a URL, text, or any data you want to encode in the QR code." },
      { name: "Customize the QR code", text: "Choose colors, size, and error correction level for your QR code." },
      { name: "Download the QR code", text: "Click download to save the QR code as a PNG image." },
    ],
    category: "UtilityApplication",
  },
  "youtube-thumbnail-downloader": {
    name: "How to Download YouTube Thumbnails",
    description: "Download YouTube video thumbnails in all available resolutions.",
    steps: [
      { name: "Paste the YouTube URL", text: "Copy and paste the YouTube video URL into the input field." },
      { name: "Choose a resolution", text: "Select from available thumbnail resolutions: HD, SD, HQ, or MQ." },
      { name: "Download the thumbnail", text: "Click download to save the thumbnail image to your device." },
    ],
    category: "UtilityApplication",
  },
  "exif-viewer": {
    name: "How to View and Remove EXIF Data from Photos",
    description: "View and strip metadata from JPEG, PNG, WebP, and TIFF photos.",
    steps: [
      { name: "Upload your photo", text: "Drag and drop or select a JPEG, PNG, WebP, or TIFF image." },
      { name: "View the EXIF metadata", text: "Review all metadata including camera model, GPS coordinates, date, and exposure settings." },
      { name: "Remove EXIF data", text: "Click remove to strip all metadata and download a clean copy of your photo." },
    ],
    category: "UtilityApplication",
  },
  "color-palette": {
    name: "How to Extract Colors from an Image",
    description: "Extract dominant colors and generate a color palette from any image.",
    steps: [
      { name: "Upload your image", text: "Drag and drop or select an image to analyze." },
      { name: "View extracted colors", text: "See the dominant colors extracted from your image with HEX, RGB, and HSL values." },
      { name: "Copy color values", text: "Click any color to copy its HEX, RGB, or HSL value to your clipboard." },
    ],
    category: "MultimediaApplication",
  },
  "favicon-generator": {
    name: "How to Create a Favicon from an Image",
    description: "Generate favicons in all standard sizes from a single source image.",
    steps: [
      { name: "Upload a source image", text: "Drag and drop or select a PNG, JPG, WebP, or SVG image to use as your favicon." },
      { name: "Preview all sizes", text: "Preview your favicon in all standard sizes from 16x16 to 512x512 pixels." },
      { name: "Download the favicon package", text: "Download all favicon sizes as a ZIP file ready to add to your website." },
    ],
    category: "DeveloperApplication",
  },
  "svg-to-png": {
    name: "How to Convert SVG to PNG Online",
    description: "Convert SVG vector files to PNG raster images with custom scale options.",
    steps: [
      { name: "Upload your SVG file", text: "Drag and drop or select an SVG file from your device." },
      { name: "Choose scale and options", text: "Select the output scale (1x, 2x, 3x, 4x) and background color." },
      { name: "Download the PNG", text: "Click download to save the converted PNG image." },
    ],
    category: "MultimediaApplication",
  },
  "image-to-base64": {
    name: "How to Convert an Image to Base64",
    description: "Encode images as Base64 data URIs for embedding in HTML, CSS, or JSON.",
    steps: [
      { name: "Upload your image", text: "Drag and drop or select a PNG, JPG, WebP, GIF, or SVG image." },
      { name: "Get the Base64 output", text: "View the generated Base64 string or data URI for your image." },
      { name: "Copy the result", text: "Click copy to add the Base64 string to your clipboard for use in your code." },
    ],
    category: "DeveloperApplication",
  },
  "video-frame-extractor": {
    name: "How to Extract Frames from a Video",
    description: "Capture individual frames from MP4, WebM, and MOV video files.",
    steps: [
      { name: "Upload your video", text: "Drag and drop or select an MP4, WebM, or MOV video file." },
      { name: "Navigate to the desired frame", text: "Use the timeline to find the exact frame you want to capture." },
      { name: "Save the frame", text: "Click capture to save the frame as a PNG or JPG image." },
    ],
    category: "MultimediaApplication",
  },
  "stripe-fee-calculator": {
    name: "How to Calculate Stripe Processing Fees",
    description: "Calculate Stripe fees for any transaction amount in multiple currencies.",
    steps: [
      { name: "Enter the transaction amount", text: "Type the amount you want to charge or receive." },
      { name: "Select your currency", text: "Choose from USD, EUR, GBP, or BRL to see the correct fee rates." },
      { name: "View the fee breakdown", text: "See the Stripe fee, net amount, and what to charge to receive a specific amount." },
    ],
    category: "UtilityApplication",
  },
  "text-repeater": {
    name: "How to Repeat Text Multiple Times",
    description: "Repeat any text string multiple times with custom separators.",
    steps: [
      { name: "Enter your text", text: "Type or paste the text you want to repeat." },
      { name: "Set repetitions and separator", text: "Choose how many times to repeat and what separator to use between repetitions." },
      { name: "Copy the result", text: "Click copy to add the repeated text to your clipboard." },
    ],
    category: "UtilityApplication",
  },
  "vtt-to-srt": {
    name: "How to Convert VTT Subtitles to SRT",
    description: "Convert WebVTT subtitle files to SRT format instantly.",
    steps: [
      { name: "Upload your VTT file", text: "Drag and drop or select a WebVTT (.vtt) subtitle file." },
      { name: "Preview the conversion", text: "Review the converted subtitles to ensure they are correct." },
      { name: "Download the SRT file", text: "Click download to save the converted SRT subtitle file." },
    ],
    category: "UtilityApplication",
  },
  "json-viewer": {
    name: "How to Format and Validate JSON Online",
    description: "Format, validate, and explore JSON data with syntax highlighting.",
    steps: [
      { name: "Paste your JSON", text: "Paste or type your JSON data into the editor." },
      { name: "Format or minify", text: "Click format to beautify the JSON or minify to compress it. Validation errors are highlighted." },
      { name: "Copy the result", text: "Click copy to add the formatted JSON to your clipboard." },
    ],
    category: "DeveloperApplication",
  },
  "hex-to-decimal": {
    name: "How to Convert Hexadecimal to Decimal",
    description: "Convert between hex, decimal, binary, and octal number systems.",
    steps: [
      { name: "Enter a number", text: "Type a hexadecimal, decimal, binary, or octal number." },
      { name: "View all conversions", text: "See the number converted to all four bases simultaneously." },
      { name: "Copy any result", text: "Click copy next to any conversion to add it to your clipboard." },
    ],
    category: "DeveloperApplication",
  },
  "html-minifier": {
    name: "How to Minify HTML Code Online",
    description: "Minify HTML to reduce file size and improve page loading speed.",
    steps: [
      { name: "Paste your HTML", text: "Paste or type your HTML code into the editor." },
      { name: "Click minify", text: "Press the minify button to remove whitespace, comments, and optimize the code." },
      { name: "Copy the minified HTML", text: "Click copy to add the minified HTML to your clipboard." },
    ],
    category: "DeveloperApplication",
  },
  "css-minifier": {
    name: "How to Minify CSS Stylesheets Online",
    description: "Minify CSS to remove whitespace, comments, and optimize selectors.",
    steps: [
      { name: "Paste your CSS", text: "Paste or type your CSS code into the editor." },
      { name: "Click minify", text: "Press the minify button to compress the CSS code." },
      { name: "Copy the minified CSS", text: "Click copy to add the minified CSS to your clipboard." },
    ],
    category: "DeveloperApplication",
  },
  "uuid-generator": {
    name: "How to Generate UUID v4 Identifiers",
    description: "Generate single or bulk UUID v4 identifiers instantly.",
    steps: [
      { name: "Choose generation mode", text: "Select single UUID or bulk generation and set the quantity." },
      { name: "Generate UUIDs", text: "Click generate to create new UUID v4 identifiers." },
      { name: "Copy the UUIDs", text: "Click copy to add the generated UUIDs to your clipboard." },
    ],
    category: "DeveloperApplication",
  },
  "base64-decode": {
    name: "How to Decode Base64 Strings",
    description: "Decode Base64 encoded strings back to plain text or images.",
    steps: [
      { name: "Paste the Base64 string", text: "Paste your Base64 encoded string or data URI into the input field." },
      { name: "View the decoded output", text: "See the decoded text or image preview instantly." },
      { name: "Copy or download", text: "Copy the decoded text or download the decoded image." },
    ],
    category: "DeveloperApplication",
  },
  "case-converter": {
    name: "How to Convert Text Case Online",
    description: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more.",
    steps: [
      { name: "Enter your text", text: "Type or paste the text you want to convert." },
      { name: "Choose a case format", text: "Select from UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, PascalCase, and more." },
      { name: "Copy the result", text: "Click copy to add the converted text to your clipboard." },
    ],
    category: "UtilityApplication",
  },
  "csv-to-json": {
    name: "How to Convert CSV to JSON Online",
    description: "Convert CSV data to JSON format with support for custom delimiters.",
    steps: [
      { name: "Paste or upload CSV data", text: "Paste your CSV data or upload a CSV file. Configure the delimiter if needed." },
      { name: "Preview the JSON output", text: "Review the converted JSON data with syntax highlighting." },
      { name: "Copy or download the JSON", text: "Click copy to clipboard or download as a .json file." },
    ],
    category: "DeveloperApplication",
  },
};

export function getToolHowToSchema(slug: string, baseUrl = "https://converterup.com") {
  const tool = toolSchemas[slug];
  if (!tool) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tool.name,
    description: tool.description,
    totalTime: "PT30S",
    tool: {
      "@type": "HowToTool",
      name: `ConverterUp ${slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`,
    },
    step: tool.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
      url: `${baseUrl}/tools/${slug}`,
    })),
  };
}

export function getToolWebAppSchema(slug: string, name: string, description: string, baseUrl = "https://converterup.com") {
  const tool = toolSchemas[slug];
  if (!tool) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${baseUrl}/tools/${slug}`,
    description,
    applicationCategory: tool.category,
    operatingSystem: "Any (browser-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "ConverterUp",
      url: baseUrl,
    },
  };
}
