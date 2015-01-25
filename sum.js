
const minimist = require('minimist')
const csv = require('csv-parser')
const pad = require('pad-number')
const assert = require('assert')
const fs = require('fs')

const argv = minimist(process.argv.slice(2))

const month = pad(argv._[0], 2)
const spendings = query(month, 'spendings')
const income = query(month, 'income')

calc('income', income)
calc('spendings', spendings)

function calc(type, file) {
  var res = 0
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', function(data) {
      if (data.value) res += parseInt(data.value)
    })
    .on('end', function() {
      console.log(type + ': ' + res)
    })
}

function query(month, type) {
  return './2015/' + month + '_' + type + '.csv'
}
