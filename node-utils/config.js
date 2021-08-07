const path = require('path')
module.exports = {
  // ALL source Path
  cssSrcFolder: path.join(__dirname, '..', 'src', 'static', 'scss'),
  viewsSrcFolder: path.join(__dirname, '..', 'src', 'views'),
  assetsSrc: path.join(__dirname, '..', 'src', 'static', 'assets'),

  // All Target Path
  cssTargetFolder: path.join(__dirname, '..', 'dist', 'static', 'css'),
  assetsTarget: path.join(__dirname, '..', 'dist', 'static'),
  viewsTargetFolder: path.join(__dirname, '..', 'dist'),

  // Css Build config 
  cssFiles: [
    {
      name: 'kb Page',
      srcFile: 'kb.scss',
      targetFile: 'kb.css'
    }
  ],
  jsFiles: {
    kb: path.join(__dirname, '..', 'src', 'static', 'js', 'kb.js'),
  }
}