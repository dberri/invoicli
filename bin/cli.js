#!/usr/bin/env node

var argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('create', 'Creates a PDF invoice')
  .describe('d', 'Description')
  .describe('q', 'Hours')
  .describe('r', 'Rate')
  .demandOption(['d', 'q', 'r'])
  .help('h')
  .alias('h', 'help')
  .argv;

if (argv.d && argv.q && argv.r) {
  const args = {
    INVOICE_DESCRIPTION: argv.d,
    INVOICE_RATE: argv.r.toFixed(2),
    INVOICE_HOURS: argv.q.toFixed(2),
  }
  require('../lib/index')(args)
}

// cmds
// help
// version
// create
// should ask for: Description, qty, value per qty
//  given a json config file, should render an html
//  template and convert it to PDF then delete the html
//  The JSON config can be overriden by flags during with create cmd