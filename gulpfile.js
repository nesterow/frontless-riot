const fs = require('fs')
const ejs = require('ejs')
const RIOT = fs.readFileSync('node_modules/riot/riot.esm.js', 'utf8')

const GLOBALS = RIOT.substr(0, RIOT.indexOf('/**'))
const SANDBOX = RIOT.substr(RIOT.indexOf('/**'), RIOT.length -1)
  .replace('export { __, component, install, mount, register, uninstall, unmount, unregister, version };', '')
  .replace(/document\./g, 'getDocument().' )
  .replace('Node.COMMENT_NODE', 'getNode().COMMENT_NODE')
  .replace(/COMPONENTS_IMPLEMENTATION_MAP\$1\./g, 'COMPONENTS_IMPLEMENTATION_MAP$2.')
  .replace(/COMPONENTS_IMPLEMENTATION_MAP\./g, 'COMPONENTS_IMPLEMENTATION_MAP$2.')
  .replace('function register(', 'function register$1(')
  .replace('function unregister(', 'function unregister$1(')

const EXPORTS = RIOT.substr(RIOT.indexOf('{ __,'), RIOT.length - 1)

exports.default = (cb) => {
  ejs.renderFile('./template.ejs', {GLOBALS, SANDBOX, EXPORTS,}, {}, function(err, str){
    fs.writeFileSync('./index.js', str)
    cb()
  });
}
