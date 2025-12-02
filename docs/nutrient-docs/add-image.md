# Add images to PDFs using JavaScript

You can add images to your document using the [Image Annotation API](https://www.nutrient.io/api/web/NutrientViewer.Annotations.ImageAnnotation.html).

First, convert the image you want to use into a `Blob`. Here's an example of how to do that with a remote image:

```js
const request = await fetch("https://example.com/image.jpg");
const blob = await request.blob();
```

Now, you can use the [`instance#createAttachment`](https://www.nutrient.io/api/web/NutrientViewer.Instance.html#createAttachment) method to convert it into an attachment that stores the image inside your PDF:

```js
const imageAttachmentId = await instance.createAttachment(blob);
```

To display this image attachment in the PDF itself, create an image annotation with a MIME type, attachment, description, and bounding box.

Finally, call `create` so that the SDK updates with this new annotation:

```js
const annotation = new NutrientViewer.Annotations.ImageAnnotation({
  pageIndex: 0,
  contentType: "image/jpeg",
  imageAttachmentId,
  description: "Example Image Annotation",
  boundingBox: new NutrientViewer.Geometry.Rect({
    left: 10,
    top: 20,
    width: 150,
    height: 150,
  }),
});
instance.create(annotation);
```

## Adding a button for importing image or PDF files

When in standalone mode, it's possible to configure [button form fields](https://www.nutrient.io/api/web/NutrientViewer.FormFields.ButtonFormField.html) to open a dialog where the user can import a JPG, PNG, or PDF file from their device. The imported file is then added to a PDF, replacing the appearance of the button.

It's possible to add this feature to your own buttons by setting the corresponding `action` property:

```js
const widget = new NutrientViewer.Annotations.WidgetAnnotation({
  id: NutrientViewer.generateInstantId(),
  pageIndex: 0,
  formFieldName: "buttonIcon",
  boundingBox: new NutrientViewer.Geometry.Rect({
    left: 100,
    top: 200,
    width: 100,
    height: 100,
  }),
  action: new NutrientViewer.Actions.JavaScriptAction({
    script: "event.target.buttonImportIcon()",
  }),
  borderWidth: 0,
});
const formField = new NutrientViewer.FormFields.ButtonFormField({
  name: "buttonIcon",
  annotationIds: NutrientViewer.Immutable.List([widget.id]),
});
instance.create([widget, formField]);
```

Notice the `event.target.buttonImportIcon()` call in the [JavaScript action](https://www.nutrient.io/api/web/NutrientViewer.Actions.JavaScriptAction.html#JavaScriptAction). This is the method that triggers the image import dialog.
