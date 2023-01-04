#!/bin/bash

rm -rf dist
rm -rf ios
rm -rf android
rm -rf resources/ios/icon
rm -rf resources/ios/splash
rm -rf resources/android/icon
rm -rf resources/android/splash

npm run build
capacitor-resources -p android,ios

npx cap add ios
cordova-res ios --skip-config --copy
#npx cap run ios

npx cap add android
cordova-res android --skip-config --copy
#npx cap run android