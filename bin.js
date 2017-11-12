#! /usr/bin/env node

var program = require('commander');
var npmManifest = require('./package.json');
var lib = require('./index.js');

program
  .version(npmManifest.version)
  .usage('[options] <component-name>')
  .option('--dry-run', 'Dry run the operation.')
  .option('--verbose', 'Show more logs.')
  .option('--pure-component', 'Create pure components.')
  .option('--no-container', 'Do not create a container for the component.')
  .parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
} else if (program.args.length > 1) {
  console.error('Please only provide one component name at a time.');
  process.exit(1);
} else {
  try {
    lib.createComponent(program.args[0], program);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
