'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const ENV = process.env.npm_lifecycle_event
const isProd = ENV === 'build'

module.exports = (() => {
  const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'eval-source-map',
    entry: {
      app: './src/app.ts',
    },
    output: {
      path: __dirname + '/dist',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {loader: 'ts-loader'}
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {sourceMap: !isProd}},
            {loader: 'sass-loader', options: {sourceMap: !isProd}},
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }, {
          test: /\.html$/,
          loader: 'raw-loader',
          options: {esModule: false}
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
      }),
      new MiniCssExtractPlugin({filename: '[name].css', disable: !isProd, allChunks: true}),
    ],
    devServer: {
      contentBase: './src/static',
      stats: 'minimal',
      historyApiFallback: true,
      host: '127.0.0.2',
    },
  }

  if (isProd) {
    config.optimization = {
      runtimeChunk: false,
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', {discardComments: {removeAll: true}}],
          },
        }),
        new TerserPlugin({
          cache: true,
          sourceMap: false,
          parallel: true,
          extractComments: false,
        }),
      ],
    }
    config.plugins.push(
      new CopyWebpackPlugin([{
        from: __dirname + '/src/static',
      }]),
    )
  }

  return config
})()
