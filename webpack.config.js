import webpack from "webpack";

export default {
  entry: "./app.js",
  output: {
    // output bundle will be in `dist/buit.js`
    filename: `built.cjs`,
  },
  target: "node",
  mode: "production",
  // optional: bundle everything into 1 file
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
