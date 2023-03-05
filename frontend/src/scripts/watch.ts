process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const config = require('react-scripts/config/webpack.config.js');

// removes react-dev-utils/webpackHotDevClient.js at first in the array
const devConfig = config('development')
//devConfig.entry.shift();

webpack(devConfig).watch({}, (err: any, stats: any) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: (file: any) => file !== paths.appHtml
  });
}