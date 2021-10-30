# Readhub Native

[![GitHub](https://img.shields.io/github/license/shensven/Readhubn)](./LICENSE)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhubn/react)](./package.json)
[![](https://img.shields.io/github/package-json/dependency-version/shensven/Readhubn/react-native)](./package.json)
[![Test](https://github.com/shensven/Readhubn/actions/workflows/next.yml/badge.svg?branch=next)](https://github.com/shensven/Readhubn/actions/workflows/next.yml)
[![Build](https://github.com/shensven/Readhubn/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/shensven/Readhubn/actions/workflows/main.yml)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/dbb74998402143fabf05c354f0984b32)](https://app.codacy.com/gh/shensven/Readhubn?utm_source=github.com&utm_medium=referral&utm_content=shensven/Readhubn&utm_campaign=Badge_Grade_Settings)
[![Pull Request](https://img.shields.io/badge/pull%20request-welcome-brightgreen)](https://github.com/shensven/Readhubn/pulls)

[English](./README.md) | 简体中文

[readhub.cn](https://readhub.cn) 的 React Native 实现

|                         iOS 首页                         |                       iOS 话题详情                       |                       Android 首页                       |                     Android 话题详情                     |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| ![Screenshot 1](src/assets/Screenshots/screenshot-1.png) | ![Screenshot 2](src/assets/Screenshots/screenshot-2.png) | ![Screenshot 4](src/assets/Screenshots/screenshot-4.png) | ![Screenshot 5](src/assets/Screenshots/screenshot-5.png) |

## 简介

- 项目完全使用 [React Native](https://reactnative.dev) 编写
- 项目的构建产物不收集您的任何隐私，且不夹杂任何私货
- 项目使用 [WhiteSource Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate) 保持依赖在同一个大版本下始终最新
- 项目的 Android 版本完全使用 [Github Workflow](https://github.com/shensven/Readhubn/actions) 进行单元测试和持续集成
- 项目启用了 [Hermes](https://hermesengine.dev)，因此推荐使用 [Flipper](https://fbflipper.com) 进行调试
- 项目使用了 [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated)，一个 C++ 编写的高性能动画组件

## 安装

<a href='https://play.google.com/store/apps/details?id=com.shensven.readhubn'><img width="153" alt='下载应用，请到 Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/zh-cn_badge_web_generic.png'/></a>

## 编译

### 先决条件

- [Node 12](https://nodejs.org) 或更高版本，推荐使用 [nvm](https://github.com/nvm-sh/nvm) 进行安装
- [yarn](https://yarnpkg.com/getting-started/install) 包管理器
- [Watchman](https://formulae.brew.sh/formula/watchman)
- [JDK 8](https://formulae.brew.sh/formula/openjdk@8) 或更高版本，推荐安装 [JDK 11](https://formulae.brew.sh/formula/openjdk@11)
- [Android SDK Platform 30](https://developer.android.com/studio/releases/platforms)，推荐通过 [android studio](https://developer.android.com/studio) 进行安装
- [Xcode 10](https://developer.apple.com/xcode/resources) 或更高版本
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)

### 项目初始化

```sh
yarn install
```

```sh
cd ios && pod install
```

### 真机运行 & 模拟器运行

```sh
yarn react-native run-android
```

```sh
yarn react-native run-ios
```

### 调试

使用 [Flipper](https://fbflipper.com/) 进行调试

### 测试

```sh
yarn test
```

```sh
cd android && chmod +x gradlew && ./gradlew test
```

### 构建 apk

```sh
cd android && ./gradlew assembleRelease
```

### 生成 App 开屏图

```sh
yarn react-native generate-bootsplash src/assets/Splash/bootsplash.png \
  --background-color=E8F6FE \
  --logo-width=256 \
  --assets-path=assets \
  --flavor=main
```
