const fs = require('node:fs')

function config (options = {}) {
  let envFile

  const path = options.path ?? '.env'
  try {
    envFile = fs.readFileSync(path, 'utf-8')
  } catch (e) {
    return
  }
  if (!envFile) return

  const variables = envFile.split('\n')

  for (const line of variables) {
    const [key, value] = line.split('=')
    process.env[key] = value.replaceAll('"','')
  }
}

module.exports = { config }