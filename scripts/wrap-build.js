// scripts/wrap-build.js
const fs   = require('fs')
const path = require('path')

// resolve the project root package.json
const pkgPath = path.resolve(__dirname, '../package.json')
if (!fs.existsSync(pkgPath)) {
  console.error('✖ Cannot find package.json at', pkgPath)
  process.exit(1)
}

const { version } = require(pkgPath)

const buildDir   = path.resolve(__dirname, '../build')
const versionDir = path.join(buildDir, version)

// 1. ensure build/ exists
if (!fs.existsSync(buildDir)) {
  console.error('✖ build/ not found – did you run `npm run build`?')
  process.exit(1)
}

// 2. create build/<version>/
fs.mkdirSync(versionDir, { recursive: true })

// 3. move everything except the new version folder into it
for (const name of fs.readdirSync(buildDir)) {
  if (name === version) continue
  fs.renameSync(
    path.join(buildDir, name),
    path.join(versionDir, name),
  )
}

console.log(`✔ Wrapped build/ → build/${version}/`)
