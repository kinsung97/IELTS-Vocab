const fs = require('fs')
const path = require('path')
const vm = require('vm')

const rootWordsPath = path.join(__dirname, '..', 'words.js')
const outputPath = path.join(__dirname, '..', 'miniapp', 'utils', 'words.js')

const source = fs.readFileSync(rootWordsPath, 'utf8')
const context = { window: {} }
vm.createContext(context)
vm.runInContext(source, context)

const words = context.window.ieltsWords || context.ieltsWords
if (!Array.isArray(words)) {
  throw new Error('无法从 words.js 读取 ieltsWords')
}

const output = `// 由 scripts/build-miniapp-words.js 自动生成\nmodule.exports = {\n  ieltsWords: ${JSON.stringify(words, null, 2)}\n}\n`

fs.writeFileSync(outputPath, output)
console.log(`✅ 已生成 miniapp 词库，共 ${words.length} 条：${path.relative(process.cwd(), outputPath)}`)
