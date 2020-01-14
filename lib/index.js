const fs = require('fs')
var pdf = require('html-pdf')

module.exports = (description, hours, valuePerHour) => {
  console.log(description, hours, valuePerHour)
  fs.readFile(__dirname + '/../templates/invoice-1.html', 'utf8', function (err, data) {
    if (err) throw err

    // Make replacements
    var result = data.replace(/#DESCRIPTION#/g, description);
    var result = data.replace(/#VALUE_PER_HOUR#/g, valuePerHour);
    var result = data.replace(/#HOURS#/g, hours);

    // create html file
    fs.writeFile(__dirname + '/../output/invoice.html', result, 'utf8', function (err) {
      if (err) return console.log(err);

      // creates the pdf
      var html = fs.readFileSync(__dirname + '/../output/invoice.html', 'utf8');
      var options = { format: 'A4' };
      pdf.create(html, options).toFile(__dirname + '/../output/invoice.pdf', function (err, res) {
        if (err) throw err

        console.log('Your invoice was generated and is available at ' + res.filename);

        // remove html
        fs.unlink(__dirname + '/../output/invoice.html', (err) => {
          if (err) throw err
        })
      });
    })
  });
}