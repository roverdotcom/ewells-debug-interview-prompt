/* eslint-disable @typescript-eslint/no-unused-vars */
import webpack, { Configuration } from 'webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const config: Configuration & DevServerConfig = {
  entry: './client/app.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV as 'development' | 'production' | undefined,
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:9000/',
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/static/index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  }
};

export default config;
