const path = require('path')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-designs',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '..'),
    }
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true,
            },
          },
        },
      ],
    })
    config.module.rules[3].loader = 'vue-loader'
    config.module.rules[3].options = {
      loaders: {
        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=sass', // <style lang="sass">
      },
    }
    return config
  },
}
