module.exports = {
  entry: './src/Main.jsx',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      }
    ]
  },
  target: 'web',
  resolve: {
    extensions: ['.jsx', '.js', '.css', '.json'],
  }
}
