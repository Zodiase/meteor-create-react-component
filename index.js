var fs = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var validate = require("validate-npm-package-name");

var defaultOptions = {
  componentsDirectory: 'imports/ui/components',
  useReduxContainer: false,
  pureComponent: false,
  dryRun: false,
};

var manifestNamespace = 'meteor-create-react-component';
var libRoot = __dirname;

/**
 * Returns true if this is the Meteor root directory.
 * @param  {String}  currentPath
 * @param  {Object}  options
 * @return {Boolean}
 */
function isProjectRootDir (currentPath, options) {
  var meteorDir = path.join(currentPath, '.meteor');

  if (options.verbose) {
    console.log('Searching for Meteor root directory', currentPath);
  }

  return fs.pathExistsSync(meteorDir);
}

/**
 * Searches for the Meteor root directory.
 * Returns null if the directory can not be found.
 * @param  {String} currentPath
 * @param  {Object} options
 * @return {String|null}
 */
function findProjectRootDir (currentPath, options) {
  var testPath = currentPath;
  var parentPath;

  while (!isProjectRootDir(testPath, options)) {
    parentPath = path.dirname(testPath);

    if (parentPath === testPath) {
      // Reached global root.

      if (options.verbose) {
        console.warn('Reached global root directory.');
      }

      return null;
    }

    testPath = parentPath;
  }

  if (options.verbose) {
    console.log('Meteor root directory located', testPath);
  }

  return testPath;
}

/**
 * Creates a component with the given options.
 * @param  {String} componentName
 * @param  {Object} options
 */
function createComponent (componentName, options) {
  var nameIs = validate(componentName);

  if (!nameIs.validForNewPackages) {
    throw new Error('Invalid component name.');
  }

  // Find project root directory.
  var projectRootDir = findProjectRootDir(process.cwd(), options);
  
  if (!projectRootDir) {
    throw new Error('Can not find project root directory.');
  }

  var dynamicDefaultOptions = {};

  var projectNpmManifest = require(path.join(projectRootDir, 'package.json'));
  var projectCustomOptions = projectNpmManifest[manifestNamespace] || {};
  var projectUsesReactRedux = projectNpmManifest.dependencies && ('react-redux' in projectNpmManifest.dependencies);

  if (projectUsesReactRedux) {
    dynamicDefaultOptions.useReduxContainer = true;
  }

  /**
   * The set of options that customizes the behavior of the generators.
   * This is composed from:
   * - the static default options
   * - the dynamic default options from some 'smart' detections.
   * - the custom options from the project manifest.
   * - the custom options from the CLI/caller.
   * @type {Object}
   */
  var finalOptions = _.extend(
    {},
    defaultOptions,
    dynamicDefaultOptions,
    projectCustomOptions,
    options
  );

  /**
   * The set of configs shared by the generators.
   * @type {Object}
   */
  var generatorConfig = {};

  generatorConfig.componentDir = path.resolve(projectRootDir, finalOptions.componentsDirectory, componentName);

  if (fs.pathExistsSync(generatorConfig.componentDir)) {
    throw new Error('Component directory already exists.');
  }

  if (finalOptions.dryRun) {
    console.warn('Create directory', generatorConfig.componentDir);
  } else {
    fs.ensureDirSync(generatorConfig.componentDir);
  }

  var generators = [
    'react',
    'react-redux',
  ].map(function (name) {
    return require('./' + path.join('generators', name));
  });

  generators.forEach(function (generator) {
    // `.configure` modifies `config`.
    generator.configure(generatorConfig, finalOptions);
  });

  if (finalOptions.verbose) {
    console.log('Generator config', generatorConfig);
  }

  generators.forEach(function (generator) {
    generator.generate(generatorConfig, finalOptions);
  });

  var componentRelPath = path.relative(projectRootDir, generatorConfig.componentDir);
  console.log('Component created at ' + componentRelPath);

  if (finalOptions.dryRun) {
    console.warn('Dry run complete.');
  }
}

module.exports = {
  createComponent: createComponent,
};
