const fs = require('fs')
const path = require('path')
const HTML5ToPDF = require('html5-to-pdf')

module.exports = (args) => {
  fs.readFile(__dirname + '/../templates/invoice-1.html', 'utf8', function (err, data) {
    if (err) throw err

    const result = require('./renderTemplate')(data, args)

    // create html file
    fs.writeFile(__dirname + '/../output/invoice.html', result, 'utf8', async function (err) {
      if (err) return console.log(err);

      const html5ToPDF = new HTML5ToPDF({
        inputPath: path.join(__dirname, "..", "output", "invoice.html"),
        outputPath: path.join(__dirname, "..", "output", "invoice.pdf"),
        pdf: {
          margin: {
            top: '50px',
            bottom: '50px',
            right: '50px',
            left: '50px'
          }
        }
      })

      await html5ToPDF.start()
      await html5ToPDF.build()
      await html5ToPDF.close()
      console.log('Your invoice was generated and is available at ' + path.join(__dirname, "..", "output", "invoice.pdf"));

      // removes temp html
      fs.unlink(__dirname + '/../output/invoice.html', (err) => {
        if (err) throw err
      })
    })
  });
}