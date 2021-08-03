const path = require('path')
module.exports = {
  cssTargetFolder: path.join(__dirname, '..', 'dist', 'static', 'css'),
  cssSrcFolder: path.join(__dirname, '..', 'src', 'static', 'css'),
  viewsSrcFolder: path.join(__dirname, '..', 'src', 'views'),
  viewsTargetFolder: path.join(__dirname, '..', 'dist'),
  cssFiles: [
    // {
    //   name: 'listing Page',
    //   srcFile: 'listing.scss',
    //   targetFile: 'listing.css'
    // }
  ],
  jsFiles: {
    listing: path.join(__dirname, '..', 'src', 'static', 'js', 'listing.js'),
  }
}