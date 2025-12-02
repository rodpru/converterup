# Split PDFs using JavaScript

To split a PDF into one or more separate documents, use the headless editing and remove pages operations.

In this example, you’ll be splitting a 10-page document into 2 separate 5-page documents.

For each new document, load the original document in headless mode:

```js
const instanceA = await NutrientViewer.load({
  document: document,
  headless: true,
});

const instanceB = await NutrientViewer.load({
  document: document,
  headless: true,
});
```

For each of these instances, remove the pages you don’t want for each document.

In this example, you’ll remove the last five pages from the first instance and the first five pages from the second instance, and then you’ll export the final PDF:

```js
const fileA = await instanceA.exportPDFWithOperations([
  {
    type: "removePages",
    pageIndexes: [1, 2, 3, 4, 5],
  },
]);

const fileB = await instanceB.exportPDFWithOperations([
  {
    type: "removePages",
    pageIndexes: [6, 7, 8, 9, 10],
  },
]);
```

You should now have the content of each new file as an array buffer in the above variables, which can be used however you wish.
