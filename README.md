# Maxwell flavored Modal

React Native Expo app with animated modal with the cat.

## Features

### Visual Design

- **Smooth Animations**: Independent animation system for modal and overlay
- **Spinning Maxwell**: Looping GIF animation of Maxwell the cat
- **Modern UI**: Blur effects and subtle shadows

### Audio

- **Looping Theme Music**: Maxwell the cat theme plays automatically when modal opens
- **Proper Cleanup**: Memory-efficient audio management with cleanup on unmount

### UI/UX

- **Multiple Close Options**:
  - Close button inside modal
  - Tap outside modal on blurred background
  - Android hardware back button support

## Technical Architecture

### Design Patterns Used

- **Composite Component Pattern**: Separated modal overlay and content components
- **Animation Composition**: Layered independent animations (fade + slide)
- **Resource Management Pattern**: Centralized asset loading and cleanup
- **Lifecycle Management**: Proper audio playback tied to component lifecycle

### Key Technologies

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tooling
- **expo-av**: Audio playback with looping support
- **expo-image**: Optimized image/GIF rendering
- **expo-blur**: Native blur effects for overlay
- **React Native Animated API**: High-performance animations
- **TypeScript**: Type-safe development

## Project Structure

```
Modal/
├── assets/
│   ├── images/
│   │   └── maxwell-spin.gif       # Spinning Maxwell cat GIF
│   └── sounds/
│       └── Maxwell the cat theme.mp3  # Theme music (loops)
├── App.tsx                         # Main application component
├── index.ts                        # Entry point
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
└── tsconfig.json                   # TypeScript configuration
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Emulator or Expo Go app

### Installation

1. **Clone the repository**

   ```
   cd Modal
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. **Install required Expo packages**:

   ```
   npx expo install expo-av expo-image expo-blur react-native-safe-area-context
   ```

4. **Verify assets are in place**:
   - Ensure `assets/images/maxwell-spin.gif` exists
   - Ensure `assets/sounds/Maxwell the cat theme.mp3` exists

### Running the App

**Start the development server**:

   ```
   npx expo start
   ```

## License

This project is for educational and entertainment purposes.

## Credits

- Maxwell the Cat: Internet's favorite spinning feline
- Maxwell Theme Music: Meme soundtrack
- Built with React Native & Expo
