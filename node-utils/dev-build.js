const spawn = require('cross-spawn')
const config = require('./config')
const path = require('path')
const fs = require('fs')
var sass = require('node-sass')

const WebpackBuild = spawn('npm', ['run', 'webpack-build'])

WebpackBuild.stdout.on('data', (data) => {
  console.log(`[Webpack build]: ${data}`)
})

WebpackBuild.stderr.on('data', (data) => {
  console.error(`[Webpack Build]: ${data}`)
})

WebpackBuild.on('exit', function (code, signal) {
  console.log('Webpack Build process exited with ' +
    `code ${code} and signal ${signal}`)
  cssBuild()
})

function copyFileSync(source, target) {

  var targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderRecursiveSync(source, target) {
  var files = []

  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      var curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}

const viewBuild = function () {
  copyFolderRecursiveSync(config.viewsSrcFolder, config.viewsTargetFolder)
  const tsBuild = spawn('npm', ['run', 'compile'])
  WebpackBuild.stdout.on('data', (data) => {
    console.log(`[Webpack build]: ${data}`)
  })
  
  WebpackBuild.stderr.on('data', (data) => {
    console.error(`[Webpack Build]: ${data}`)
  })
  
  WebpackBuild.on('exit', function (code, signal) {
    console.log('Webpack Build process exited with ' +
      `code ${code} and signal ${signal}`)
  })
}

const cssBuild = function () {
  config.cssFiles.forEach(function (file) {
    const filepath = path.join(config.cssSrcFolder, file.srcFile)
    sass.render({ file: filepath, outputStyle: 'compressed' }, function (err, result) {
      if (err) console.log(err)
      else {
        const buildCss = result.css.toString()
        let filepath = '/'
        const dirList = config.cssTargetFolder.split('/').filter(function (dir) {
          return dir !== ''
        })
        dirList.forEach(dir => {
          const targetFolder = path.join(filepath, dir)
          if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder)
          }
          filepath = targetFolder
        })
        filepath = path.join(filepath, file.targetFile)
        fs.writeFileSync(filepath, buildCss)
      }
    })
  })
  viewBuild()
}
