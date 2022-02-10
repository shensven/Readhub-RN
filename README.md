# Readhub Native

[![GitHub](https://img.shields.io/github/license/shensven/Readhubn)](./LICENSE)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhubn/react-native)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhubn/react)](./package.json)
[![Test](https://github.com/shensven/Readhubn/actions/workflows/next.yml/badge.svg?branch=next)](https://github.com/shensven/Readhubn/actions/workflows/next.yml)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dbb74998402143fabf05c354f0984b32)](https://app.codacy.com/gh/shensven/Readhubn?utm_source=github.com&utm_medium=referral&utm_content=shensven/Readhubn&utm_campaign=Badge_Grade_Settings)

[readhub.cn](https://readhub.cn) implementation in React Native, Currently in refactoring...

## INTRO

- Written entirely in [React Native](https://reactnative.dev)
- The build product of the project does NOT collect any of your privacy, and does NOT contain any mix private goods
- Use [WhiteSource Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate) to keep dependencies up to date under the same major version
- Use [Github Workflow](https://github.com/shensven/Readhubn/actions) exclusively for testing and continuous integration
- Has [Hermes](https://hermesengine.dev) enabled, so it is recommended to use [Flipper](https://fbflipper.com) for debugging
- The project uses [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated), a high-performance animation component written in C++

## INSTALL

<a href='https://play.google.com/store/apps/details?id=com.shensven.readhubn'><img width="153" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>

## BUILD

### PREREQUISITES

- [Node 12](https://nodejs.org) or higher
- The [yarn](https://yarnpkg.com/getting-started/install) package manager
- [Watchman](https://formulae.brew.sh/formula/watchman)
- [Xcode 10](https://developer.apple.com/xcode/resources) or higher
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- [JDK 11](https://formulae.brew.sh/formula/openjdk@11) or higher
- Android SDK
  - Build-Tools `30.0.2`
  - NDK `21.4.7075529`

### GET STARTED

```sh
yarn install
```

```sh
cd ios && pod install
```

### RUNNING ON SIMULATOR

```sh
yarn react-native run-ios
```

```sh
yarn react-native run-android
```

### RUNNING ON DEVICE

```sh
npm install -g ios-deploy
```
```sh
yarn react-native run-ios --device
```

```sh
yarn react-native run-android
```

### DEBUGGING

Using [Flipper](https://fbflipper.com/) for debugging

### TEST

```sh
yarn test
```

```sh
cd android && chmod +x gradlew && ./gradlew test
```

### ASSEMBLE THE APK

```sh
cd android && ./gradlew assembleRelease
```

### BOOTSPLASH GENERATION

```sh
yarn react-native generate-bootsplash src/assets/splash/bootsplash.png \
  --background-color=E8F6FE \
  --logo-width=192 \
  --flavor=main
```

## LICENSE

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fshensven%2FReadhubn.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fshensven%2FReadhubn?ref=badge_large)
