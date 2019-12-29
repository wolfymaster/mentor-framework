const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack');
// const CompressionPlugin = require('compression-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'public')
};

module.exports = {
  mode: "development",
  devtool: "eval",
  cache: true,
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.dist,
    filename: "[name].js",
    publicPath: "/"
  },
  devServer: {
    compress: false,
    historyApiFallback: true,
    contentBase: "public",
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // path where the images will be saved
              name: "assets/[name].[ext]"
            }
          },

          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                quality: 65
              },
              pngquant: {
                quality: "10-20",
                speed: 4
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //new CleanWebpackPlugin([PATHS.dist]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/public", "index.html"),
      //favicon: "src/public/images/fav.png"
    }),
    new Dotenv(),
    /*
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require("./vendors-manifest.json")
    }),
    */
    new MiniCssExtractPlugin(),
    // new UglifyJSPlugin(),
    //new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    /*
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    */
    new CopyWebpackPlugin([
      { from: PATHS.app + "/public/static", to: PATHS.dist } // Copy everything from src/public/static to dist folder
    ])
  ],
  resolve:{
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  }
};
