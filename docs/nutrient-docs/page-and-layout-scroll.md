# Page layout and scroll options in our JavaScript PDF viewer

Nutrient Web SDK’s PDF viewer layout options are designed around the concept of spreads, which are visual groupings of pages. Spreads allow pages to be displayed individually or side by side in a double-page layout. For publications such as books and magazines with a cover page, our viewer supports keeping the cover page in single-page layout, while the subsequent pages appear in a double-page layout. These discrete units of single or double pages constitute a spread.

Spreads ensure seamless compatibility with various document viewing modes, enhancing readability and navigation.

Users can switch between scrolling and viewing a single spread (single or double page) at any time for a customized PDF reading experience.

All layout configurations are managed through the [`ViewState`](https://www.nutrient.io/api/web/NutrientViewer.ViewState.html). Refer to our [view state](https://www.nutrient.io/../../customizing-the-interface/viewstate/) guide for more information on customizing document presentation.

## Layout

With [`ViewState#layoutMode`](https://www.nutrient.io/api/web/NutrientViewer.ViewState.html#layoutMode), you can define how pages are displayed within a spread in the PDF viewer:

- **Single-page mode** [`LayoutMode.SINGLE`](https://www.nutrient.io/api/web/NutrientViewer.html#.LayoutMode) — Displays one page per spread. This is the default PDF layout mode, and it's ideal for focused reading.

- **Double-page mode** [`LayoutMode.DOUBLE`](https://www.nutrient.io/api/web/NutrientViewer.html#.LayoutMode) — Combines two pages per spread for a book-like reading experience. You can adjust the spacing between pages using [`ViewState#pageSpacing`](https://www.nutrient.io/api/web/NutrientViewer.ViewState.html#pageSpacing) and ensure that the first spread contains a single page by enabling [`ViewState#keepFirstSpreadAsSinglePage`](https://www.nutrient.io/api/web/NutrientViewer.ViewState.html#keepFirstSpreadAsSinglePage).

- **Automatic mode** [`LayoutMode.AUTO`](https://www.nutrient.io/api/web/NutrientViewer.html#.LayoutMode) — Designed for responsive document viewing, especially on tablets. It optimizes space usage by displaying either a single page or a two-page spread based on the screen orientation. When switching to landscape mode, it automatically adjusts to show two pages. In portrait mode, it remembers the previously displayed page and restores it.

## Scrolling

[`ViewState#scrollMode`](https://www.nutrient.io/api/web/NutrientViewer.ViewState.html#scrollMode) controls how users navigate between pages in the PDF viewer. We offer three scrolling modes:

- **Continuous scrolling** [`ScrollMode.CONTINUOUS`](https://www.nutrient.io/api/web/NutrientViewer.html#.ScrollMode) — Displays all spreads in a long, scrollable view, similar to browsing a webpage. This is the default scrolling mode, and it works seamlessly with all layout modes. You can adjust the spacing between spreads using [`ViewState#spreadSpacing`](https://www.nutrient.io/api/web/NutrientViewer.ViewState.html#spreadSpacing) for a customized viewing experience.

- **Per-spread scrolling** [`ScrollMode.PER_SPREAD`](https://www.nutrient.io/api/web/NutrientViewer.html#.ScrollMode) — Limits scrolling to a single spread at a time. A spread consists of one page in single-page mode and two pages in double-page mode. When users navigate between spreads, the zoom level automatically adjusts to fit the entire next spread into view.

- **Disabled scrolling** [`ScrollMode.DISABLED`](https://www.nutrient.io/api/web/NutrientViewer.html#.ScrollMode) — Restricts scrolling to a single spread, similar to `ScrollMode.PER_SPREAD`, but prevents UI-based navigation between pages. The only way to change pages is through the [programmatic API](https://www.nutrient.io/api/web/NutrientViewer.ViewState.html#currentPageIndex). The zoom level updates automatically to ensure the entire spread is visible.

Even with UI navigation disabled, users can still jump to other pages via link annotations. Refer to the [`annotations.press`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#~AnnotationsPressEvent) event to control annotation-based navigation.

## Layout configurator

If you want to allow users to customize the PDF viewer layout, you can add a layout options popover to the toolbar. This enables users to switch between different page layouts and scrolling modes directly from the interface.

The following example shows how to integrate the layout configuration option into the toolbar:

### ES6+

```js
let toolbarItems = NutrientViewer.defaultToolbarItems;
// Add the `layout-config` toolbar item after the `pager` item.
let pagerIndex = toolbarItems.findIndex((item) => item.type == "pager");
toolbarItems.splice(pagerIndex + 1, 0, { type: "layout-config" });

NutrientViewer.load({
  toolbarItems,
  //...
});
```

### JAVASCRIPT

```js
var toolbarItems = NutrientViewer.defaultToolbarItems;
// Add the `layout-config` toolbar item after the `pager` item.
var pagerIndex = toolbarItems.findIndex(function (item) {
  return item.type == "pager";
});
toolbarItems.splice(pagerIndex + 1, 0, { type: "layout-config" });

NutrientViewer.load({
  toolbarItems: toolbarItems,
  //...
});
```
