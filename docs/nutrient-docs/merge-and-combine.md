# Merge PDF files using JavaScript

The `importDocument` operation allows you to add an existing PDF to your document. It’ll be added either before or after the specified page index, depending on if `afterPageIndex` or `beforePageIndex` is used.

By setting the `treatImportedDocumentAsOnePage` flag, you can make sure that, as far as all follow-up operations are concerned, the imported document is only treated as a single page that makes specifying indices easier.

`importedPageIndexes` may be used to import specific pages or a range of pages. If this parameter is omitted, the entire document will be imported.

To merge or combine documents, you can use the `importDocument` operation to import another document and combine it with the currently loaded document.

If the same document’s `Blob` object is used in the same operations array for different operations, the same `Blob` object will be reused for all of them:

```js
instance.applyOperations([
  {
    type: "importDocument",
    afterPageIndex: 10, // Import document after page 10.
    treatImportedDocumentAsOnePage: false, // All the imported document pages will be treated separately for other operations.
    document: blob, // Document to import.
  },
]);
```

If the `treatImportedDocumentAsOnePage` property is set to `true`, all of the imported document pages will be treated as a single one for the other operations that are about to be performed. This can be useful for some situations (e.g. you want to apply a rotation to all of the pages of the imported document). After all the current operations are applied to the document, the imported pages will behave like regular pages in the document.

Here’s an example that uses `fetch` to retrieve an external document, converts it to a `Blob`, and passes it in an `importDocument` operation:

```js
fetch("imported.pdf")
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res;
  })
  .then((res) => res.blob())
  .then((blob) => {
    instance.applyOperations([
      {
        type: "importDocument",
        importedPageIndexes: [2, 4, [7, 10]],
        beforePageIndex: 3,
        document: blob,
        treatImportedDocumentAsOnePage: false,
      },
    ]);
  });
```

It’s not possible to import the same document more than once in the same Document Editor UI operations block (see the [Document Editing UI](https://www.nutrient.io/guides/web/features/document-editor-ui/) guide for more on this). However, it’s still possible to do it programmatically by chaining `importDocument` operations with the same `Blob` object.

## Exporting a PDF

After this operation is complete, you can call [`instance#exportPDF`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#exportPDF) to get an `ArrayBuffer` containing the data for the final PDF.

If you need to apply this operation and export the resulting document in one step, you can provide the same argument passed to [`instance#applyOperations`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#applyOperations) to [`instance#exportPDFWithOperations`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#exportPDFWithOperations) instead, and it’ll resolve to an `ArrayBuffer` containing the final PDF.
