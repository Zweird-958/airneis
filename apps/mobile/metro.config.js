/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('expo/metro-config').MetroConfig} */
const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")
const path = require("path")
const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, "../..")
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
})
config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
]
config.resolver.sourceExts = ["js", "jsx", "ts", "tsx", "json"]

module.exports = withNativeWind(config, {
  input: "./src/globals.css",
  configPath: "./tailwind.config.ts",
})
