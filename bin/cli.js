#!/usr/bin/env node

var argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('create', 'Creates a PDF invoice')
  .describe('d', 'Description')
  .describe('q', 'Hours')
  .describe('v', 'Value per hour')
  .demandOption(['d', 'q', 'v'])
  .help('h')
  .alias('h', 'help')
  .argv;

if (argv.d && argv.q && argv.v) {
  const { d, q, v } = argv
  require('../lib/index')(d, q, v)
}

// cmds
// help
// version
// create
// should ask for: Description, qty, value per qty
//  given a json config file, should render an html
//  template and convert it to PDF then delete the html
//  The JSON config can be overriden by flags during with create cmd