# Enhance PDF viewing with linearized downloading

Linearized PDFs allow viewing a PDF while it’s still downloading, enabling faster access to information in the PDF. This is especially useful for large documents where quick access is critical.

Document Engine with [streaming](https://www.nutrient.io/guides/document-engine/viewer/streaming/) offers even more advantages, but sometimes linearized downloading is the best option.

## Comparison

|                                       | Document Engine streaming | Linearized downloading |
| ------------------------------------- | ------------------------- | ---------------------- |
| Fast initial page rendering           |                           |                        |
| Only requires HTTPS server            |                           |                        |
| Read-write while downloading          |                           |                        |
| Only downloads the required data      |                           |                        |
| Any PDF supported without preparation |                           |                        |

## Enable linearized downloading

PDFs are read-only until fully downloaded. This means that while you can see the information in a PDF, you cannot, for example, add an annotation until the PDF is fully downloaded.

1. **Prepare your PDF for linearization**: This can be done using Nutrient’s [Document Engine](https://www.nutrient.io/guides/document-engine/optimization/linearize/) or [.NET SDK](https://www.nutrient.io/guides/dotnet/optimization/linearize/). If you’re using other third-party tools, PDF linearization might be called fast web loading.

2. **Upload the linearized PDF** to your HTTPS server.

3. **Add the [`allowLinearizedLoading: true`](https://www.nutrient.io/api/web/NutrientViewer.Configuration.html#allowLinearizedLoading)** option in `NutrientViewer.load`:

```js
NutrientViewer.load({
  container: "#container",

  document: "https://example.com/path/to/linearized.pdf",
  allowLinearizedLoading: true,
});
```

## Check server support

Use curl to check if your server accepts range requests:

```bash

curl -I https://example.com/path/to/linearized.pdf -H "Range: bytes=0-1"

```

If the server supports range requests, you’ll see a `206 Partial Content` response and an `Accept-Ranges: bytes` header.

You might notice that very small linearized PDFs are downloaded in a single request, even when your server is correctly configured for range requests and responds with a `206 Partial Content` status.

This is **expected behavior** and is due to a performance optimization in the viewer.

- The viewer is designed to request a minimum initial block of data (a “chunk”) of approximately **\~128 KB**. This size is optimized to render the first page of most documents quickly.

- If your PDF file is **smaller than this \~128 KB threshold**, the viewer’s initial request will cover the entire file, resulting in a single download.

## Additional information

- This is strictly a feature to speed up viewing a PDF while downloading. It won’t allow you to modify the PDF until it’s fully downloaded.

- Linearized downloading only has an effect when a PDF is downloaded from an external web server.
