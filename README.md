# Video Blog React Native Expo Project

Welcome to my React Native Expo project! Here you'll find information about the project, its features, and instructions for installation and setup.

## About the Project

This project is built using React Native and Expo, making it portable and convenient for cross-platform mobile app development.

## Features

- **Cross-Platform**: Supports iOS and Android without additional effort.
- **Ease of Use**: Expo provides convenient tools for development and debugging.
- **Powerful React Native Capabilities**: The entire React Native ecosystem is at your disposal.

## Installation

1. Install Expo CLI if you haven't already:

```bash
npm install -g expo-cli

2. Clone this repository:

git clone https://github.com/Bohdan-Heiko/Video-blog.git


3. Navigate to the project directory and install dependencies:

cd video-blog
npm install


4. Running

 Android: npx react-native run-android
 IOS: xcrun xctrace list devices
      npx expo run:ios --device ID DEVICE

5. Build

  Android: cd android -> ./gradlew assembleRelease
  IOS: with XCODE
```

## Library

```bash
1. ESLint
ESLint is a tool for static code analysis that helps detect and fix errors, and ensures code consistency. We chose ESLint because it:

Helps detect errors and vulnerabilities in the code
Ensures code consistency and adherence to certain standards
Supports multiple plugins and configurations, allowing us to customize it to our needs
Why we chose ESLint
We chose ESLint because it:

Helps us detect and fix errors early in the development process
Ensures code consistency, making it easier to maintain and develop
Supports multiple plugins and configurations, allowing us to customize it to our needs
ESLint Configuration
We use the following ESLint configuration:

Plugins: [eslint-config-prettier, eslint-config-standard, eslint-plugin-import, eslint-plugin-prettier etc]

Conclusion
ESLint helps us ensure high-quality and consistent code, making it easier to maintain and develop. We recommend using ESLint in future projects, as it provides many benefits and simplifies the development process.

2. Zod
We chose Zod for data validation, as it provides a powerful and flexible way to describe and validate data structures. Zod allows us to define complex data schemas and automatically generate code for validation, making it easier to work with data and reduce errors.

3. React-Redux
We use React-Redux to manage the application state. This library provides a powerful toolkit for managing global application state, making it easy to update and synchronize data between different components.

4 React-Native-SVG
We use React-Native-SVG to render vector graphics in our application. This library allows us to create complex vector graphics and animations, adding visual appeal to our application.

5. UseForm
React Hook Form is a library for managing forms in React applications. It provides a simple and efficient way to handle form data, validation, and submission.

Zod: provides powerful data validation, flexibility, and automatic code generation

React-Redux: provides a powerful toolkit for managing global application state, making it easy to update and synchronize data

RTK-QUERY: Provides the opportunity to work normally with the API, dictates the rules for writing convenient services


React-Native-SVG: allows us to create complex vector graphics and animations, adding visual appeal to our application
ESLint: helps us ensure high-quality and consistent code, making it easier to maintain and develop

Conclusion
These libraries help us implement a powerful and flexible application, making it easier to maintain and develop. We recommend using these libraries in future projects, as they provide many benefits and simplify the development process.

```