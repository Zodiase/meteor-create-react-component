var fs = require('fs-extra');
var path = require('path');
var root = __dirname;

function configure (config, options) {
  if (config.componentFilename && options.useReduxContainer && !options.noContainer) {
    config.componentFilename = 'component.js';
    config.containerFilename = 'index.js';
  }
}

function generate (config, options) {
  if (!config.containerFilename) {
    return;
  }

  var outputFilePath = path.resolve(config.componentDir, config.containerFilename);
  var templateFilePath = path.resolve(
    root,
    'templates',
    'container--full.js',
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
