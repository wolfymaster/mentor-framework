var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: {
        vendor: [path.join(__dirname, "vendors.js")]
    },
    output: {
        path: path.join(__dirname, "src", "public", "static", "assets", "js"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname)
        }),
//        new webpack.optimize.OccurenceOrderPlugin(),
//        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        root: path.resolve(__dirname),
        modulesDirectories: ["node_modules"]
    }
};

