
module.exports = transform

const fields = {
  'Naam / Omschrijving': 'details',
  'Bedrag (EUR)': 'value',
  'Af Bij': '+/-'
}

function transform(obj) {
  var res = {}
  Object.keys(fields).forEach(function(key) {
    const val = obj[key]
    const fieldKey = fields[key]
    res[fieldKey] = val
    if (key == 'Af Bij') {
      if ('Af' == val) res[fieldKey] = '-'
      res[fieldKey] = '+'
    }
  })
  return res
}
