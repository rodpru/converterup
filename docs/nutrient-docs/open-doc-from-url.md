# Open and display PDF files from a remote URL using JavaScript

### PDF

[PDF](https://www.nutrient.io/guides/web/open-a-document/from-remote-url/)

### MS Office

[MS Office](https://www.nutrient.io/guides/web/open-a-document/office-from-remote-url/)

### Image

[Image](https://www.nutrient.io/guides/web/open-a-document/image-from-remote-url/)

To load a document from a remote URL in standalone mode, pass it in the [configuration](https://www.nutrient.io/api/web/NutrientViewer.Configuration.html) object passed to [`NutrientViewer.load()`](https://www.nutrient.io/api/web/NutrientViewer.html#.load):

```js
NutrientViewer.load({
  document: documentUrl,
});
```

## Accessing an authenticated document

However, sometimes you want to restrict access to your documents so they’re not publicly available on the internet. One common way to achieve this is with [HTTP Basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme).

If you try to load a document from a URL that’s protected by HTTP basic authentication, Nutrient Web SDK will ask you for a username and password. To avoid entering these, you can fetch the document yourself, passing the credentials as an `Authorization` header. Once you’ve received the response, you can pass it to the `NutrientViewer.load()` method as an `ArrayBuffer`:

```js
async function loadProtectedPDF(documentUrl, username, password) {
  // Base64-encode your credentials and set them as an `Authorization` header.
  const headers = new Headers();
  const encodedCredentials = btoa(`${username}:${password}`);
  headers.set("Authorization", `Basic ${encodedCredentials}`);

  // Fetch the PDF and read the response as an `ArrayBuffer`.
  const pdfResponse = await fetch(documentUrl, { headers });
  const documentBuffer = await pdfResponse.arrayBuffer();

  // Pass the `ArrayBuffer` as a PDF option instead of a URL.
  return NutrientViewer.load({
    document: documentBuffer,
  });
}
```

## Accessing an encrypted document

The easiest way to securely transfer your document is to serve it through HTTPS. This way, the browser will take care of decrypting the secured communication for you.

Additionally, you can encrypt the document’s content on the server using your own custom encryption. When you fetch the encrypted document, decrypt the data in the browser into an `ArrayBuffer`. Then pass it to the `NutrientViewer.load()` method, which will render your document:

```js
NutrientViewer.load({
  document: myDecryptedArrayBuffer,
});
```

## Loading options

You can open files in any of the [supported file formats](https://www.nutrient.io/guides/web/about/file-type-support/).

`NutrientViewer.load()` also accepts different configuration options:

- [`annotationTooltipCallback`](/api/web/NutrientViewer.Configuration.html#.annotationTooltipCallback)

- [`customRenderers`](/api/web/NutrientViewer.Configuration.html#.customRenderers)

- [`electronicSignatures`](/api/web/NutrientViewer.Configuration.html#.electronicSignatures)

- [`annotationPresets`](/api/web/NutrientViewer.Configuration.html#annotationPresets)

- [`autoSaveMode`](/api/web/NutrientViewer.Configuration.html#autoSaveMode)

- [`baseUrl`](/api/web/NutrientViewer.Configuration.html#baseUrl)

- [`container`](/api/web/NutrientViewer.Configuration.html#container)

- [`customFonts`](/api/web/NutrientViewer.Configuration.html#customFonts) (Standalone only)

- [`disableForms`](/api/web/NutrientViewer.Configuration.html#disableForms)

- [`disableHighQualityPrinting`](/api/web/NutrientViewer.Configuration.html#disableHighQualityPrinting)

- [`disableOpenParameters`](/api/web/NutrientViewer.Configuration.html#disableOpenParameters)

- [`disableTextSelection`](/api/web/NutrientViewer.Configuration.html#disableTextSelection)

- [`disableWebAssemblyStreaming`](/api/web/NutrientViewer.Configuration.html#disableWebAssemblyStreaming) (Standalone only)

- [`document`](/api/web/NutrientViewer.Configuration.html#document) (Standalone only)

- [`editableAnnotationTypes`](/api/web/NutrientViewer.Configuration.html#editableAnnotationTypes)

- [`enableAutomaticLinkExtraction`](/api/web/NutrientViewer.Configuration.html#enableAutomaticLinkExtraction) (Standalone only)

- [`enableServiceWorkerSupport`](/api/web/NutrientViewer.Configuration.html#enableServiceWorkerSupport)

- [`formFieldsNotSavingSignatures`](/api/web/NutrientViewer.Configuration.html#formFieldsNotSavingSignatures)

- [`headless`](/api/web/NutrientViewer.Configuration.html#headless)

- [`initialViewState`](/api/web/NutrientViewer.Configuration.html#initialViewState)

- [`instantJSON`](/api/web/NutrientViewer.Configuration.html#instantJSON) (Standalone only)

- [`isAPStreamRendered`](/api/web/NutrientViewer.Configuration.html#isAPStreamRendered)

- [`isEditableAnnotation`](/api/web/NutrientViewer.Configuration.html#isEditableAnnotation)

- [`isEditableComment`](/api/web/NutrientViewer.Configuration.html#isEditableComment)

- [`licenseKey`](/api/web/NutrientViewer.Configuration.html#licenseKey) (Standalone only)

- [`locale`](/api/web/NutrientViewer.Configuration.html#locale)

- [`maxDefaultZoomLevel`](/api/web/NutrientViewer.Configuration.html#maxDefaultZoomLevel)

- [`maxPasswordRetries`](/api/web/NutrientViewer.Configuration.html#maxPasswordRetries)

- [`minDefaultZoomLevel`](/api/web/NutrientViewer.Configuration.html#minDefaultZoomLevel)

- [`overrideMemoryLimit`](/api/web/NutrientViewer.Configuration.html#overrideMemoryLimit) (Standalone only)

- [`password`](/api/web/NutrientViewer.Configuration.html#password)

- [`populateInkSignatures`](/api/web/NutrientViewer.Configuration.html#populateInkSignatures)

- [`populateStoredSignatures`](/api/web/NutrientViewer.Configuration.html#populateStoredSignatures)

- [`preventTextCopy`](/api/web/NutrientViewer.Configuration.html#preventTextCopy)

- [`printMode`](/api/web/NutrientViewer.html#.PrintMode)

- [`renderPageCallback`](/api/web/NutrientViewer.Configuration.html#renderPageCallback)

- [`serverUrl`](/api/web/NutrientViewer.Configuration.html#serverUrl)

- [`stampAnnotationTemplates`](/api/web/NutrientViewer.Configuration.html#stampAnnotationTemplates)

- [`standaloneInstancesPoolSize`](/api/web/NutrientViewer.Configuration.html#standaloneInstancesPoolSize) (Standalone only)

- [`styleSheets`](/api/web/NutrientViewer.Configuration.html#styleSheets)

- [`theme`](/api/web/NutrientViewer.Configuration.html#theme)

- [`toolbarItems`](/api/web/NutrientViewer.Configuration.html#toolbarItems)

- [`toolbarPlacement`](/api/web/NutrientViewer.Configuration.html#toolbarPlacement)

- [`trustedCAsCallback`](/api/web/NutrientViewer.Configuration.html#trustedCAsCallback) (Standalone only)

- [`XFDF`](/api/web/NutrientViewer.Configuration.html#XFDF) (Standalone only)

- [`XFDFKeepCurrentAnnotations`](/api/web/NutrientViewer.Configuration.html#XFDFKeepCurrentAnnotations) (Standalone only)

**Example**:

```js
NutrientViewer.load({
  container,
  document: documentUrl,
  toolbarItems: NutrientViewer.defaultToolbarItems.filter(
    (item) => item.type !== "print",
  ),
  initialViewState: new NutrientViewer.ViewState({
    sidebarMode: NutrientViewer.SidebarMode.THUMBNAILS,
  }),
});
```
