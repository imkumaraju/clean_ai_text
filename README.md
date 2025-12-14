# Aim Tracker

A Flutter application to track and complete daily tasks with progress monitoring.

## Features

- ✅ **Add Daily Tasks**: Quickly add tasks for the current day
- ✅ **Track Progress**: Visual progress indicator showing completion percentage
- ✅ **Mark as Complete**: Tap tasks to mark them as done
- ✅ **Task History**: View past tasks organized by date
- ✅ **Persistent Storage**: Tasks are saved locally using SharedPreferences
- ✅ **Clean UI**: Modern Material Design 3 interface

## Screenshots

### Home Screen
- Displays today's date
- Shows progress (completed/total tasks)
- Circular progress indicator
- List of today's tasks with checkboxes
- Floating action button to add new tasks

### History Screen
- Tasks grouped by date
- Progress bar for each day
- Expandable cards to view task details

## Getting Started

### Prerequisites

Make sure you have Flutter installed on your system:
- Flutter SDK (3.0.0 or higher)
- Dart SDK (included with Flutter)
- Android Studio / VS Code with Flutter extensions
- An Android emulator or physical device

### Installation

1. **Install Flutter** (if not already installed):
   - Download from: https://flutter.dev/docs/get-started/install
   - Add Flutter to your PATH

2. **Navigate to the project directory**:
   ```bash
   cd c:\Users\Lenovo\Documents\aim_tracker
   ```

3. **Get dependencies**:
   ```bash
   flutter pub get
   ```

4. **Run the app**:
   ```bash
   flutter run
   ```

### Building for Release

To build an APK for Android:
```bash
flutter build apk --release
```

The APK will be located at: `build/app/outputs/flutter-apk/app-release.apk`

## Project Structure

```
lib/
├── main.dart                      # App entry point
├── models/
│   └── task.dart                  # Task data model
├── providers/
│   └── task_provider.dart         # State management
├── services/
│   └── storage_service.dart       # Local storage
├── screens/
│   ├── home_screen.dart           # Main screen
│   └── history_screen.dart        # History view
└── widgets/
    └── task_tile.dart             # Task list item widget
```

## Dependencies

- **provider**: State management
- **shared_preferences**: Local data persistence
- **intl**: Date formatting

## Usage

1. **Add a Task**: Tap the + button and enter your task
2. **Complete a Task**: Tap the checkbox next to the task
3. **Delete a Task**: Tap the delete icon
4. **View History**: Tap the history icon in the app bar

## Technical Details

- **State Management**: Provider pattern
- **Storage**: SharedPreferences for simple key-value storage
- **Architecture**: MVVM-like pattern with providers
- **UI**: Material Design 3 with custom theming

## Future Enhancements

- Task categories/tags
- Task priorities
- Notifications/reminders
- Weekly/monthly statistics
- Dark mode
- Task editing
- Recurring tasks

## License

This project is open source and available for personal use.
