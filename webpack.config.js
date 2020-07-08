const nodeExternals = require('webpack-node-externals')
module.exports = {
  entry: './src/web/server.ts',
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'index.js'
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  externals: [ nodeExternals() ]
}
