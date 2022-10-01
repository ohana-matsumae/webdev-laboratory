const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    login: './src/login-src/index.ts',
    main: './src/main-page-src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/i,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer'),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['login'],
      filename: 'login.html',
      template: path.join(__dirname, './public/login.html'),
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['main'],
      filename: 'main-page.html',
      template: path.join(__dirname, './public/main-page.html'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'js/[name]/bundle.[contenthash].js',
  },
  devServer: {
    port: 3000,
  },
};
