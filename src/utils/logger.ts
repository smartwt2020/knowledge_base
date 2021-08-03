const chalk = require('chalk')

export default {
  info (msg:string):void {
    console.log(chalk.blue(msg))
  },
  alert (msg:string):void {
    console.log(chalk.red(msg))
  },
  success (msg:string):void {
    console.log(chalk.green(msg))
  },
  warning (msg:string):void {
    console.log(chalk.yellow(msg))
  }
}