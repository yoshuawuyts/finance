const write    = require('csv-write-stream')
const parse    = require('csv-parser')
const pad      = require('pad-number')
const minimist = require('minimist')
const through  = require('through2')
const assert   = require('assert')
const fs       = require('fs')

const argv = minimist(process.argv.slice(2), {
  string: ['outfile', 'bank'],
  alias: { outfile: 'O' },
  default: { bank: 'ing' }
})
try {
  const transform = require('./banks/' + argv.bank);
} catch(e) {
  console.log('We don\'t have any parsers for \'' + argv.bank + '\' yet.')
  console.log('Consider submitting a pull request to add your particular bank.')
  process.exit(2)
}

const file = argv._[0]
if (!file) {
  console.log('Please specify a file to parse')
  process.exit(2)
}

// Read a file and transform it.
fs.createReadStream(file)
  .pipe(parse())
  .pipe(through.obj(handleTransform))
  .pipe(write({headers: ['details', '+/-', 'value']}))
  .pipe(streamTarget(argv))

function handleTransform(chunk, enc, cb) {
  this.push(transform(chunk))
  cb()
}

function streamTarget(argv) {
  if (argv.O) return fs.createWriteStream(argv.O)
  return process.stdout
}
