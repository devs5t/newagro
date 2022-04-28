#!/bin/bash

rm -rf dist
rm -rf ios
rm -rf android

yarn run build
yarn resources

npx cap add ios
cordova-res ios --skip-config --copy
npx cap run ios

npx cap add android
cordova-res android --skip-config --copy
npx cap run android