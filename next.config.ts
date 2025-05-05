// next.config.ts
import { readFileSync } from 'fs'
import { resolve } from 'path'
import type { NextConfig } from 'next'

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, 'package.json'), 'utf8')
) as { version: string }

const isProd = process.env.NODE_ENV === 'production'
const version = pkg.version  // e.g. "1.0.3"

const nextConfig: NextConfig = {
  // 1. static‐export settings
  output: 'export',
  trailingSlash: true,
  distDir: 'build',

  // 2. prefix *all* routes (and your HTML output) with /<version>
  basePath: isProd ? `/${version}` : '',

  // 3. CDN prefix for your JS/CSS/_next assets
  assetPrefix: isProd
    ? `https://ggrible23.github.io/polargrid-website/build/${version}`
    : '',
  
  images: {
    unoptimized: true,
    loader: 'default',
    path: isProd
      ? `https://ggrible23.github.io/polargrid-website/build/${version}/_next/image`
      : '/_next/image',
  },

  // 4. (optional) still hash any imported media
  webpack(config, { isServer }) {
    if (!isServer && isProd) {
      config.output.filename = 'static/js/[name].[contenthash:8].js'
      config.output.chunkFilename = 'static/chunks/[name].[contenthash:8].js'
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff2?)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]',
        },
      })
    }
    return config
  },
}

export default nextConfig
