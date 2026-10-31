import type { Config } from 'stylelint'

const config: Config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  rules: {
    'color-hex-length': 'long',
    'alpha-value-notation': 'number',
    'font-weight-notation': 'numeric',
    'selector-class-pattern': null,
    'custom-property-empty-line-before': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: 'first-nested',
        ignore: 'blockless-after-blockless',
      },
    ],
    'media-feature-range-notation': 'prefix',
    'font-family-name-quotes': 'always-unless-keyword',
    'declaration-block-single-line-max-declarations': 0,
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*', 'storybook-static/**/*'],
}

export default config
