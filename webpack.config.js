const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production';

  const getStyleLoaders = () => [
    isProd ? MiniCSSExtractPlugin.loader : 'style-loader',
    'css-loader',
  ];

  const getPlugins = () => {
    const plugins = [
      new HTMLWebpackPlugin({
        template: 'src/index.html',
        buildTime: new Date().toString(),
      }),
    ];

    if (isProd) {
      plugins.push(new MiniCSSExtractPlugin({ filename: 'main-[hash:8].css' }));
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src/main.js',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        // Loading images
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:7].[ext]',
              },
            },
          ],
        },
        // Styles (CSS)
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },
        // Styles (SCSS/SASS)
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), 'sass-loader'],
        },
      ],
    },
    plugins: getPlugins(),
    devServer: {
      open: true,
      port: 7070,
    },
  };
};
