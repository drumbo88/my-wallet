const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco')
const { uniq, flatten, castArray } = require('lodash')

const updateWebpackConfig = {
    overrideWebpackConfig: ({ webpackConfig }) => {
      // Get hold of the babel-loader, so we can add shared folders to it, ensuring that they get compiled too
      const result = getLoader(webpackConfig, loaderByName('babel-loader'))

      const loader = result.match.loader

      // castArray + flatten to support loader.include being defined as both single string/regex or array of string/regex
      loader.include = uniq(flatten([ ...castArray(loader.include) ]))

      return webpackConfig
    }
}

module.exports = {
  webpack: {
    alias: {
      common: path.resolve(__dirname, '../common/build'),
    },
    configure: webpackConfig => {
        const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
          ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
        )

        webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
        return webpackConfig
      }
    },
    plugins: [
      { plugin: updateWebpackConfig, options: {} }
    ]
}
