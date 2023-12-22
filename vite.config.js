// import { resolve } from "path";
import { defineConfig } from "vite";

// export const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

// export default defineConfig({
//   root: "/src/",

//   build: {
//     outDir: "../dist",
//     rollupOptions: {
//       format: "esm",
//       input: {
//         main: resolve(__dirname, "/src/index.html"),
//         cart: resolve(__dirname, "/src/cart/index.html"),
//         product: resolve(__dirname, "/src/product-pages/index.html"),
//         listing: resolve(__dirname, "/src/product-listing/index.html"),
//         checkout: resolve(__dirname, "/src/checkout/index.html"),
//       },
//     },
//   },
// });
export const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default defineConfig({
  root: "src/", // Updated root path without leading slash

  build: {
    outDir: "../dist",
    rollupOptions: {
      format: "esm",
      input: {
        main: "index.html", // Updated input paths without leading slashes
        cart: "cart/index.html",
        product: "product-pages/index.html",
        listing: "product-listing/index.html",
        checkout: "checkout/index.html",
      },
    },
  },
});
