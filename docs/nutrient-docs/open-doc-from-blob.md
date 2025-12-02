# Open and display PDFs from a Blob using JavaScript

### PDF

[PDF](https://www.nutrient.io/guides/web/open-a-document/from-blob/)

### MS Office

[MS Office](https://www.nutrient.io/guides/web/open-a-document/office-from-blob/)

### Image

[Image](https://www.nutrient.io/guides/web/open-a-document/image-from-blob/)

Nutrient Web SDK in standalone mode accepts different input data types for a document: either as the document URL string, or as an `ArrayBuffer` containing the document file. Set it in the `document` property of the `NutrientViewer.Configuration` object passed to [`NutrientViewer.load()`](https://www.nutrient.io/api/web/NutrientViewer.html#.load). If your source document is available as a `Blob`, you can obtain an object URL for it and pass it in `document`:

```js
const documentBlobObjectUrl = URL.createObjectURL(blob);
NutrientViewer.load({
  document: documentBlobObjectUrl,
}).then((instance) => {
  // Make sure to revoke the object URL so the browser doesn't hold on to the blob object that's not needed any more.
  URL.revokeObjectURL(documentBlobObjectUrl);
});
```

The `Blob` can contain a file in any of the [different supported input formats](https://www.nutrient.io/guides/web/viewer/office-documents/).

It’s also possible to set the initial conditions of the viewer in the same configuration object by setting the [`initialViewState`](https://www.nutrient.io/api/web/NutrientViewer.Configuration.html#initialViewState) property. For example, if you want to open a document on page 8 with the thumbnails sidebar open, do it like this:

```js
const documentBlobObjectUrl = URL.createObjectURL(blob);
NutrientViewer.load({
  document: documentBlobObjectUrl,
  initialViewState: new NutrientViewer.ViewState({
    pageIndex: 8,
    sidebarMode: NutrientViewer.SidebarMode.THUMBNAILS,
  }),
}).then((instance) => {
  // Make sure to revoke the object URL so the browser doesn't hold on to the blob object that's not needed any more.
  URL.revokeObjectURL(documentBlobObjectUrl);
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
