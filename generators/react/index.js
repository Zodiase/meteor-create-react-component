var fs = require('fs-extra');
var path = require('path');
var root = __dirname;

function configure (config, options) {
  config.componentFilename = 'index.js';
}

function generate (config, options) {
  if (!config.componentFilename) {
    return;
  }

  var outputFilePath = path.resolve(config.componentDir, config.componentFilename);
  var templateFilePath = path.resolve(
    root,
    'templates',
    (
      options.pureComponent
      ? 'component--bare.js'
      : 'component--full.js'
    ),
  );

  if (options.dryRun) {
    console.warn('Create file', outputFilePath);
  } else {
    fs.copySync(templateFilePath, outputFilePath);
  }
}

module.exports = {
  configure: configure,
  generate: generate,
};
