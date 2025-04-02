const HTMLPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.tsx", 
    background: "./src/background/service-worker.ts", 
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: (pathData) => {
      return pathData.chunk.name === 'background' ? 'background/service-worker.js' : 'bundle.js';
    },
  },
  plugins: [
    new HTMLPlugin({
      template: "./public/index.html",
      chunks: ['main'], 
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: "", 
          globOptions: {
            ignore: ["**/index.html", "**/*.ts"],
          },
        },
      ],
    }),
  ],
};
