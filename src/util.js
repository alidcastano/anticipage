const { statSync } = require('fs')

export function isFileSync (path) {
  try {
    return statSync(path).isFile()
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false
    } else {
      throw e
    }
  }
}
