#!/bin/bash

site=browse-staging.goodcity.hk
environment=production

echo "Setting variable APP_SHA"
APP_SHA=$(git rev-parse --short HEAD 2> /dev/null)
if [ $? -ne 0 ]; then
  APP_SHA=$(hg parent --template '{gitnode}' | cut -c1-7)
fi
export APP_SHA

echo "Building $site [$environment]"
EMBER_CLI_CORDOVA=1 staging=true ./node_modules/ember-cli/bin/ember build --environment=$environment
if [ $? -ne 0 ]; then
  exit 1
fi

cd cordova/deploy
node update-version.js
git config --global user.email "none@none"
git config --global user.name "CircleCi"
git config --global push.default current
git add ../config.xml
git commit -m "Update build version [ci skip]"
git push

# add path to zipalign
export PATH="$ANDROID_HOME/build-tools/22.0.1:$PATH"

cd ..
npm i -g cordova
rm -rf platforms plugins
ln -s ../dist www
cordova prepare android
cordova build android
chmod +x ./deploy/testfairy-upload.sh
./deploy/testfairy-upload.sh platforms/android/build/outputs/apk/android-debug.apk