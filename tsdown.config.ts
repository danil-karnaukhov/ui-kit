import fs from 'node:fs/promises'

import { defineConfig, type TsdownPlugin } from 'tsdown'

const packageJsonPlugin: TsdownPlugin = {
  name: 'package-json-plugin',
  writeBundle: async (outputOptions) => {
    const packageJsonContent = await fs.readFile('package.json', 'utf-8')
    const packageJson = JSON.parse(packageJsonContent) as Record<string, unknown>

    delete packageJson.scripts
    delete packageJson.devDependencies
    delete packageJson.devEngines
    delete packageJson.packageManager

    await fs.writeFile(`${outputOptions.dir}/package.json`, JSON.stringify(packageJson, null, 2))
  },
}

export default defineConfig({
  plugins: [packageJsonPlugin],
  entry: [
    'src/**/*.{ts,tsx}',
    'src/styles/reset.scss',
    'src/styles/fonts.scss',
    'src/styles/tokens.scss',
    'src/styles/base.scss',
    '!src/**/*.{test,stories}.{ts,tsx}',
    '!src/**/*.mdx',
    '!src/**/*.d.ts',
  ],
  outDir: 'build',
  copy: ['src/fonts', 'README.md', 'LICENSE'],
  platform: 'neutral',
  tsconfig: 'tsconfig.lib.json',
  dts: true,
  css: {
    splitting: true,
    inject: true,
  },
  inputOptions: {
    experimental: {
      attachDebugInfo: 'none',
    },
  },
})
