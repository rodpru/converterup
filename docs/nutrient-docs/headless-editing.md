# Headless PDF editor

It’s possible to apply document editing operations without the need to present any user interface (UI) to the user.

## Standalone

In [Standalone mode](https://www.nutrient.io/guides/web/about/operational-modes/) of Nutrient Web SDK, you can perform the operation using JavaScript in the browser by setting the `headless` option as `true` when loading the JavaScript library. This indicates you don’t want a UI:

```js
NutrientViewer.load({
  //...
  headless: true,
}).then((instance) => {
  // Apply your operations.
});
```

Once the SDK is loaded, you can apply any of our operations as normal.

## Server-backed

When using the Server-backed [operational mode](https://www.nutrient.io/guides/web/about/operational-modes/), a variety of operations are available server-side. See the [Document Engine documentation](https://www.nutrient.io/guides/document-engine/) for additional information.
