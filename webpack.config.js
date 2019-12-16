const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  mode : 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },

  module: {
    rules:
        [
	{
	  test: /\.(png|svg|jpg|gif)$/,
       use: [
         'file-loader']
     },
    {
       test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
        'file-loader' ]
    },
    {
        test: /\.css$/,
        use: [
              'style-loader',
              'css-loader'
            ]
          },
      {
        test: /\.scss$/,
        use: [{
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }, {
            loader: 'sass-loader' // compiles Sass to CSS
          }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};