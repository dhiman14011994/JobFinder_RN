# This repository was initiated with create-react-native-web-app

[![NPM](https://nodei.co/npm/create-react-native-web-app.png)](https://npmjs.org/package/create-react-native-web-app)

![GitHub issues](https://img.shields.io/github/issues/orYoffe/create-react-native-web-app.svg)
![license](https://img.shields.io/github/license/orYoffe/create-react-native-web-app.svg)
![GitHub top language](https://img.shields.io/github/languages/top/orYoffe/create-react-native-web-app.svg)
![npm](https://img.shields.io/npm/v/create-react-native-web-app.svg)

### A simple CLI tool to start your React Native Web project to develop same app for IOS Android and Web

<p align="center" >
<img width="300"  src="https://raw.githubusercontent.com/orYoffe/create-react-native-web-app/master/template/src/logo.png">
</p>

## Installation

```sh
# Run create-react-native-web-app <project-directory>
$ npx create-react-native-web-app myApp

# if you previously installed this package globaly run this command first to uninstall the previous version:
# npm uninstall -g create-react-native-web-app

# cd into your <project-directory>
$ cd myApp

# Run Web/Ios/Android development
# Web
$ npm run web

# IOS (simulator)
$ npm run ios

# Android (connected device)
$ npm run android

```

- To work with IOS and Android - Install Xcode and Android studio and follow the react native instructions [under the "Building Projects with Native Code" tab](http://facebook.github.io/react-native/docs/getting-started.html)

<p align="center" >
<img width="1000"  src="https://raw.githubusercontent.com/orYoffe/create-react-native-web-app/master/cli_preview.png">
</p>

## Folder structure

```
myApp
├── android (When opening with Android studio, open this folder)
│   └── android project files
├── ios (When opening with Xcode, open this folder)
│   └── ios project files
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    └── project code
```

## Resources

- [React Native for Web (react-native-web)](https://github.com/necolas/react-native-web)
- [React](https://reactjs.org/)
- [React Native](http://facebook.github.io/react-native/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Create React Native App](https://github.com/react-community/create-react-native-app)

## Errors FirebaseCore

If you face @import FirebaseCore; not found issue in IOS
comment all @import FirebaseCore; and replace with #import "FirebaseCore/FirebaseCore.h"


## Errors Cannot read property 'configurations' of undefined.

If you face Cannot read property 'configurations' of undefined issue 
comment all const configurations = userConfig.configurations || []; and replace with const configurations = '';


## Errors Attempted import error: 'requireNativeComponent' is not exported from 'react-native'. react-native-fast-image
comment all
// import { NativeModules, StyleSheet, requireNativeComponent, Image, View } from 'react-native';

// const FastImageView = requireNativeComponent('FastImageView', FastImage, {
//   nativeOnly: {
//     onFastImageLoadStart: true,
//     onFastImageProgress: true,
//     onFastImageLoad: true,
//     onFastImageError: true,
//     onFastImageLoadEnd: true
//   }
// });

and replace

import { NativeModules, StyleSheet, Image, View, Platform } from 'react-native';

let FastImageView

if (Platform.OS === 'web') {
  FastImageView = Image
} else {
  const { requireNativeComponent } = require('react-native')
  FastImageView = requireNativeComponent('FastImageView', FastImage, {
    nativeOnly: {
      onFastImageLoadStart: true,
      onFastImageProgress: true,
      onFastImageLoad: true,
      onFastImageError: true,
      onFastImageLoadEnd: true,
    },
  })
}
