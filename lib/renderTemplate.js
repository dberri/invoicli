const templateConfig = require('../template.config')

module.exports = (template, args) => {
  let result = template

  for (const key in templateConfig) {
    const targetKey = `#${key}#`
    result = result.replace(new RegExp(targetKey, 'g'), templateConfig[key])
  }

  for (const key in args) {
    const targetKey = `#${key}#`
    result = result.replace(new RegExp(targetKey, 'g'), args[key])
  }

  const invoiceAmount = args.INVOICE_HOURS * args.INVOICE_RATE
  result = result.replace(/#INVOICE_AMOUNT#/g, invoiceAmount.toFixed(2))

  const today = new Date().toISOString().split('T')[0]
  result = result.replace(/#INVOICE_DATE#/g, today.split('-').reverse().join('/'))

  const due = today.replace(/(\d{2})$/, templateConfig['INVOICE_DUE_DAY'])
  result = result.replace(/#INVOICE_DUE_DATE#/g, due.split('-').reverse().join('/'))

  return result;
}