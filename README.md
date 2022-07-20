<div align="center" >
  <h1>
    <img src="./src/assets/appIcon/AppIconAlpha.png" width="180px" height="180px" />
    <p>Readhub RN</p>
  </h1>
</div>

[![GitHub](https://img.shields.io/github/license/shensven/Readhub-RN)](./LICENSE)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhub-RN/react-native)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhub-RN/react)](./package.json)
[![Test](https://github.com/shensven/Readhub-RN/actions/workflows/next.yml/badge.svg?branch=next)](https://github.com/shensven/Readhub-RN/actions/workflows/next.yml)
[![Publish](https://github.com/shensven/Readhub-RN/actions/workflows/publish.yml/badge.svg?branch=main)](https://github.com/shensven/Readhub-RN/actions/workflows/publish.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/383f840768d947f5826e9de365d05bee)](https://www.codacy.com/gh/shensven/Readhub-RN/dashboard?utm_source=github.com&utm_medium=referral&utm_content=shensven/Readhub-RN&utm_campaign=Badge_Grade)

SvenFE implementation of [Readhub](https://readhub.cn) in React Native, Currently in refactoring...

|                         iOS Home                         |                     iOS Topic Detail                     |                       android Home                       |                   android Topic Detail                   |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| ![Screenshot 1](src/assets/Screenshots/screenshot-1.png) | ![Screenshot 2](src/assets/Screenshots/screenshot-2.png) | ![Screenshot 4](src/assets/Screenshots/screenshot-4.png) | ![Screenshot 5](src/assets/Screenshots/screenshot-5.png) |

## 📦 INSTALLATION

<a href='https://play.google.com/store/apps/details?id=com.shensven.readhubn'><img width="153" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>

## 🔨 BUILD

### INTRO

- Written in [React Native](https://reactnative.dev)
- does NOT collect any of your privacy data
- To keep dependencies up to date under the same major version via [WhiteSource Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate)
- Testing and continuous integration via [Github Workflow](https://github.com/shensven/Readhub-RN/actions)
- Has [Hermes](https://hermesengine.dev) enabled, so it is recommended to use [Flipper](https://fbflipper.com) for debugging

### PREREQUISITES

- [Node 14](https://nodejs.org) or higher
- The [yarn](https://yarnpkg.com/getting-started/install) package manager
- [Watchman](https://formulae.brew.sh/formula/watchman)
- [Xcode 10](https://developer.apple.com/xcode/resources) or higher
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- [JDK 11](https://formulae.brew.sh/formula/openjdk@11) or higher
- Android SDK
  - Build-Tools `31.0.0`
  - NDK `21.4.7075529`

### GET STARTED

```sh
yarn install
```

```sh
cd ios && pod install
```

### DEBUGGING ON THE SIMULATOR

```sh
yarn react-native run-ios
```

```sh
yarn react-native run-android
```

### DEBUGGING ON THE DEVICE

```sh
npm install -g ios-deploy
```

```sh
yarn react-native run-ios --device
```

```sh
yarn react-native run-android
```

### DEBUGGING TOOL

Using [Flipper](https://fbflipper.com/) for debugging

### TEST

```sh
yarn test
```

```sh
cd android && chmod +x gradlew && ./gradlew test
```

### iOS DEPLOY

```sh
yarn react-native run-ios --configuration Release --device
```

### ASSEMBLE THE APK

```sh
cd android && ./gradlew assembleRelease
```

### BOOTSPLASH GENERATION

```sh
yarn react-native generate-bootsplash src/assets/splash/bootsplash.png \
  --background-color=DAE5E3 \
  --logo-width=192 \
  --flavor=main
```

## 📜 LICENSE

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fshensven%2FReadhub-RN.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fshensven%2FReadhub-RN?ref=badge_large)
