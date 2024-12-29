import fs from 'node:fs'

function main() {
  const content = fs.readFileSync('missa.md').toString()
  const splitter = `===========================================================`
  const songs = content.split(splitter).map(s => s.trim())

  fs.writeFileSync('missa.json', JSON.stringify(songs, null, ' '))
}

main()