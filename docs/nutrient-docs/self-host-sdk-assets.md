# Self-host assets in Web SDK

When installing Nutrient Web SDK using a package manager, the SDK loads additional resources at runtime — for example, web workers, fonts, and icons — that must be served from a web server. By default, all those assets are loaded from our CDN, which should be enough for most use cases. However, if you need complete control over dependencies for compliance, offline functionality, security policies, or performance optimization, you can serve the SDK assets yourself.

Follow the steps below to self-host the SDK assets.

1. Download the assets archive.

2. Extract the contents of the archive directly into your application’s public directory — for example, `/public/`. The extracted files should be accessible at your application’s root URL when served.

3. Configure the SDK to load the assets from your server by setting the `baseUrl` option when initializing the SDK:

   ```tsx
   NutrientViewer.load({
     container,
     document: "/nutrient-web-demo.pdf", // Place your PDF in the public directory.
     baseUrl: `${window.location.protocol}//${window.location.host}/${
       import.meta.env.PUBLIC_URL ?? "" // Usually empty for Vite, but supports custom deployments.
     }`,
   });
   ```

4. Verify self-hosting is working:
   - Start your development server.
   - Open browser DevTools and navigate to the **Network** tab.
   - Load a PDF in your application.
   - Confirm SDK assets are being loaded from your domain, and not from `cdn.cloud.pspdfkit.com`.

> **Deprecation warning**: Prior to version 1.9.0, the recommended way to self-host assets was by using the files inside `node_modules/@nutrient-sdk/viewer/dist/nutrient-viewer-lib`. This is no longer recommended and will result in a warning in the console. Use the method described above instead. This change improves the SDK installation experience by providing more flexibility in how you manage and deploy assets.
