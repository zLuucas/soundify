
<div align="center">
  <br />
      <img src="./assets/gitimages/logo.png" alt="Tela inicial do Soundify" width="600">
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="reactnative" />
    <img src="https://img.shields.io/badge/-Expo-black?style=for-the-badge&logoColor=white&logo=expo&color=000020" alt="expo" />
    <img src="https://img.shields.io/badge/-Clerk-black?style=for-the-badge&logoColor=white&logo=clerk&color=gray" alt="clerk" />
    <img src="https://img.shields.io/badge/-Redux-black?style=for-the-badge&logoColor=white&logo=redux&color=764ABC" alt="redux" />
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwind-css&color=38B2AC" alt="tailwind" />
  </div>
  
  <br />
  <p align="center">
    A music streaming app built with <strong>React Native</strong> and <strong>Expo</strong>, offering an immersive experience to listen to your favorite songs, explore playlists, and discover new artists.
  </p>
</div>

**[Leia em Português 🇧🇷](./README_pt.md)**

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Main Features](#main-features)
3. [Screenshots](#screenshots)
4. [Technologies Used](#technologies-used)
5. [Installation and Setup](#installation-and-setup)
6. [Project Architecture](#project-architecture)
7. [Contributions](#contributions)
8. [License](#license)

## 🚀 <a name="introduction">Introduction</a>

Soundify is a music streaming app developed with **React Native** and **Expo** that provides a rich experience for listening to music, exploring playlists, and discovering new artists. Using modern technologies such as **Clerk** for authentication and **Redux** for state management, Soundify offers an intuitive user interface with full player functionality, favorites, and playlist customization.

## 🎯 <a name="main-features">Main Features</a>

- **Account Creation and Login**: Register and log in securely to access all app features.
- **Full Player**: Complete playback control with play/pause, repeat, and volume control.
- **Play Songs**: Full-featured player interface.
- **Favorite Songs**: Add songs to favorites and create a personalized playlist with all your preferred songs.
- **Create, Edit, and Delete Playlists**: Customize your experience with exclusive playlists.
- **Artist Navigation**: Explore songs by artists and easily access their playlists and tracks.
- **Spotify-Style Floating Player**: Keep track of what’s playing with an always-visible floating player.
- **Music Progress Bar**: Interactive bar that lets you track progress, skip, or rewind the song.
- **Profile Editing**: Customize your account by choosing and updating your profile picture.

## 📸 <a name="screenshots">Screenshots</a>

<p align="center">
  <img src="./assets/gitimages/print1.png" alt="captura de tela 1" width="245">
  <img src="./assets/gitimages/print2.png" alt="captura de tela 2" width="245">
  <img src="./assets/gitimages/print3.png" alt="captura de tela 3" width="245">
  <img src="./assets/gitimages/print4.png" alt="captura de tela 4" width="245">
  <img src="./assets/gitimages/print5.png" alt="captura de tela 5" width="245">
  <img src="./assets/gitimages/print16.png" alt="captura de tela 15" width="245">
  <img src="./assets/gitimages/print6.png" alt="captura de tela 6" width="245">
  <img src="./assets/gitimages/print7.png" alt="captura de tela 7" width="245">
  <img src="./assets/gitimages/print8.png" alt="captura de tela 8" width="245">
  <img src="./assets/gitimages/print9.png" alt="captura de tela 9" width="245">
  <img src="./assets/gitimages/print10.png" alt="captura de tela 10" width="245">
  <img src="./assets/gitimages/print11.png" alt="captura de tela 11" width="245">
  <img src="./assets/gitimages/print12.png" alt="captura de tela 12" width="245">
  <img src="./assets/gitimages/print13.png" alt="captura de tela 13" width="245">
  <img src="./assets/gitimages/print14.png" alt="captura de tela 14" width="245">
  <img src="./assets/gitimages/print15.png" alt="captura de tela 15" width="245">
</p>

## 🚀 <a name="technologies-used">Technologies Used</a>

- **TypeScript**: JavaScript superset that adds static typing for safer and more efficient development.
- **React Native**: Building mobile interfaces.
- **Expo**: Simplified development and deployment.
- **Expo Router**: Facilitates screen navigation in a declarative and organized way, inspired by the web page routing system.
- **React Native Track Player**: Advanced player functionalities.
- **Clerk**: User authentication and management, ensuring security and ease of use.
- **Redux**: Centralized state management for playlists, favorite songs, and user preferences.
- **Tailwind (Nativewind)**: Styling with utility classes using Tailwind via Nativewind, making the interface responsive and styled.

## 🛠 <a name="installation-and-setup">Installation and Setup</a>

1. Clone this repository:
  ```bash
  git clone https://github.com/zLuucas/soundify
  cd soundify
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3. **Download Special Builds**

   This project uses native code, so a special build is required for each platform:

   - **Android**: [Link to Android build download](https://expo.dev/accounts/darkincorporation/projects/soundify/builds/90f2a93c-1306-4566-8ffa-74b9a9e96664)
   - **iOS**: [Link to iOS build download](https://expo.dev/accounts/darkincorporation/projects/soundify/builds/58cf1c5a-ee28-4360-b7dd-a7696cfb91a6)

4. **Configure Clerk for Authentication**

   For proper authentication functionality, a Clerk API Key must be configured:

   - Create a project in Clerk at [clerk.com](https://clerk.com).
   - Copy the project’s Publishable Key.
   - Create a .env file in the project root and add the key:

  ```bash
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-key-here"
  ```

5. **Start the Expo Server**

   Start the Expo server so the app can runs:

   ```bash
   npx expo start
   ```

6. **Run on Simulator**

   With the build downloaded and installed, run the app on your preferred simulator. Access the localhost address generated by Expo CLI in the simulator to connect it to the server.

## 📂 <a name="project-architecture">Project Architecture</a>

- **src/**: Contains the app’s source code.
- **components/**: Reusable components, such as control buttons and lyric views.
- **store/**: Redux configuration for state management.
- **constants/**: Stores colors, images, and other constants.
- **hooks/**: Custom hooks, including player and theme integration.
- **types/**: TypeScript type definitions for use throughout the project.

## 🤝 <a name="contributions">Contributions</a>

Contributions are welcome! Feel free to open issues and submit pull requests.

## 📄 <a name="license">License</a>

This project is licensed under the MIT License. See the LICENSE file for more details.

Developed by Lucas Matias.

Connect with me on LinkedIn to explore more of my projects!
