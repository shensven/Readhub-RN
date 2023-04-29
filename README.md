<div align="center" >
  <h1>
    <img src="./src/assets/appIcon/AppIconAlpha.png" width="180px" height="180px" />
    <p>Readhub RN</p>
  </h1>
</div>

[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhub-RN/react-native)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhub-RN/react)](./package.json)
[![Test](https://github.com/shensven/Readhub-RN/actions/workflows/test.yml/badge.svg?branch=dev)](https://github.com/shensven/Readhub-RN/actions/workflows/test.yml)
[![Publish](https://github.com/shensven/Readhub-RN/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/shensven/Readhub-RN/actions/workflows/publish.yml)
![GitHub all releases](https://img.shields.io/github/downloads/shensven/Readhub-RN/total)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/383f840768d947f5826e9de365d05bee)](https://www.codacy.com/gh/shensven/Readhub-RN/dashboard?utm_source=github.com&utm_medium=referral&utm_content=shensven/Readhub-RN&utm_campaign=Badge_Grade)

SvenFE implementation of [Readhub](https://readhub.cn) in React Native

|                            1                             |                            2                             |                            3                             |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| ![Screenshot 1](src/assets/Screenshots/screenshot-1.png) | ![Screenshot 2](src/assets/Screenshots/screenshot-2.png) | ![Screenshot 3](src/assets/Screenshots/screenshot-3.png) |

## 📦 DISTRIBUTION

### iOS

- Not released yet

### Android

- [GitHub Release](https://github.com/shensven/Readhub-RN/releases)

## 🔨 Build

### Prequisites

- [Node 14](https://nodejs.org) or higher
- [yarn](https://yarnpkg.com/getting-started/install)
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 10](https://developer.apple.com/xcode/resources) or higher
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- [JDK 11](https://formulae.brew.sh/formula/openjdk@11) or higher
- Android SDK
  - Build-Tools `33.0.0`
  - NDK `23.1.7779620`

For more detailed environment configuration, please refer to the official React Native documentation.👇
https://reactnative.dev/docs/environment-setup

### Get Started

```sh
yarn install
cd ios && pod install
```

### iOS Deployment

```sh
yarn ios --configuration Release --device
```

### Assem the APK

```sh
cd android && chmod +x gradlew
./gradlew assembleRelease
```

### Debug

We recommend you to use [Flipper](https://fbflipper.com/) to debug the app.

### Generate the Splash Screen

```sh
yarn react-native generate-bootsplash src/assets/splash/bootsplash.png \
  --background-color=DAE5E3 \
  --logo-width=192 \
  --flavor=main
```
