import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. export everything as static files
  output: "export",

  // 2. make URLs like /about/ → /about/index.html
  trailingSlash: true,

  // 3. where Next will drop the build+export output
  distDir: "build",

  // 4. if you plan to serve your JS/CSS from a CDN or Webflow assets,
  //    prefix all <script> and <link> URLs at runtime
  // assetPrefix: "https://cdn.prod.website-files.com/681536661f864cbf90057f70",

  // 5. if you use next/image, disable its built-in optimization in export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
