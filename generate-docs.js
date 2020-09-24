const glob = require('glob')
const { exec } = require('child_process')

const cwd = 'src'

glob('**/*.js', { cwd }, (er, files) => {
  const allFiles = files.join(' ')

  exec(`npx docco ${allFiles} --output ../docs`, { cwd }, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
})
