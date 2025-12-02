# Add pages to PDFs using JavaScript

Using `addPage` adds a blank page before or after the specified page index using the provided configuration:

```js
instance.applyOperations([
  {
    type: "addPage",
    afterPageIndex: 1, // Add a new page after page 1.
    backgroundColor: new NutrientViewer.Color({ r: 100, g: 200, b: 255 }), // Set the new page background color.
    pageWidth: 750,
    pageHeight: 1000,
    rotateBy: 0, // No rotation.
    // Insets are optional.
  },
]);
```

## Exporting a PDF

After this operation is complete, you can call [`instance#exportPDF`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#exportPDF) to get an `ArrayBuffer` containing the data for the final PDF.

If you need to apply this operation and export the resulting document in one step, you can provide the same argument passed to [`instance#applyOperations`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#applyOperations) to [`instance#exportPDFWithOperations`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#exportPDFWithOperations) instead, and it’ll resolve to an `ArrayBuffer` containing the final PDF.
