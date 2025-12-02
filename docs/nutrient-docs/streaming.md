# PDF document streaming in JavaScript

When opening documents from [Document Engine](https://www.nutrient.io/guides/document-engine/) with Nutrient Web SDK, document pages will be streamed to the viewer for instant on-demand page access and lightning-fast viewing, searching, and scrolling in the browser. Instead of downloading a full document before being rendered in the viewer, [Nutrient Web SDK](https://www.nutrient.io/guides/web/) will intelligently load only the pages it needs, delivering a much faster online experience overall.

[Try for free](https://www.nutrient.io/try)

[Launch demo](https://www.nutrient.io/demo/)

Document streaming is available when using [Web SDK](/guides/web/) + [Document Engine](/guides/document-engine/) with storage. For downloading linearized PDFs, refer to the [linearized downloads](/guides/web/viewer/linearized-downloads) guide.

Streaming documents can significantly improve performance, particularly in the following scenarios:

- When dealing with large documents (in terms of data volume or number of pages).

- When anticipating user access over a sluggish network connection, such as on a mobile device or in a remote location.

- When expecting users to be using devices with limited CPU capabilities, such as older computers or mobile phones.

## How document streaming works

Document streaming is a technique that breaks a document down into smaller, manageable chunks and loads only the necessary parts of the document as needed, rather than loading the entire document at once. This approach offers several benefits, including faster load times, improved user experience, and reduced client-side resource consumption.

Streaming works for all documents and images loaded from Document Engine by Web SDK, including PDFs that haven’t been linearized.

Here’s how document streaming works:

1. **Document rendering** — The initial step involves rendering a document on the server, instead of the client’s browser.

2. **On-demand loading** — Once the document is prepared, the client’s browser loads only the initial chunk or the first few pages of the document (including any annotations). Since the actual PDF isn’t sent to the client, and only the necessary information is, the initial load time is minimized and allows the user to start interacting with the document more quickly.

3. **Displaying the PDF** — The web client’s role is limited to displaying the results of the rendering process that the server has already expertly handled.

4. **Lazy loading** — As the user navigates through the document, additional chunks are loaded on demand. For example, when a user scrolls down to view more pages or clicks on a link within the document, the server retrieves and sends the relevant chunk of content to the user’s device. This approach optimizes network bandwidth and minimizes resource usage.

## Advantages of document streaming

Document streaming brings a variety of benefits:

1. **Resilience to network interruptions** — Imagine a scenario where a user is downloading a large document and a network hiccup occurs. Streaming ensures that the user doesn’t have to start over; at the very least, it minimizes the delay in viewing the first page.

2. **Improved Reliability with Limited Resources** — Streaming sidesteps memory and storage limitations by efficiently handling data on the fly.

## How to implement streaming

When using Nutrient Web SDK [with Document Engine](https://www.nutrient.io/guides/web/about/operational-modes/), document streaming is enabled automatically when documents are loaded from Document Engine — no configuration is required.
