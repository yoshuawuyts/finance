
const csv = require('csv-parser')
const assert = require('assert')
const fs = require('fs')

var res = 0

fs.createReadStream('./2015/02_spendings.csv')
  .pipe(csv())
  .on('data', function(data) {
    if (data.value) res += parseInt(data.value)
  })
  .on('end', function() {
    console.log('sum: ' + res)
  })
