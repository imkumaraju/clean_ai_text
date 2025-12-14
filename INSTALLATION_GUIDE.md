# Flutter Installation & APK Build Guide

## Current Status
❌ Flutter is not installed on your system. You'll need to install it to build and test the app.

## Option 1: Install Flutter (Recommended)

### Step 1: Download Flutter
1. Visit: https://docs.flutter.dev/get-started/install/windows
2. Download the latest stable Flutter SDK for Windows
3. Extract the zip file to a location like `C:\src\flutter`

### Step 2: Update PATH
1. Search for "Environment Variables" in Windows
2. Click "Environment Variables"
3. Under "User variables", find "Path" and click "Edit"
4. Click "New" and add: `C:\src\flutter\bin` (or wherever you extracted Flutter)
5. Click "OK" to save

### Step 3: Verify Installation
Open a **new** PowerShell window and run:
```powershell
flutter doctor
```

This will check your setup and show what else needs to be installed.

### Step 4: Install Android Studio (if not already installed)
1. Download from: https://developer.android.com/studio
2. Install Android Studio
3. Open Android Studio → More Actions → SDK Manager
4. Install Android SDK Command-line Tools
5. Run `flutter doctor --android-licenses` and accept all licenses

### Step 5: Build Your App
Once Flutter is installed, navigate to your project and run:

```powershell
# Navigate to project
cd c:\Users\Lenovo\Documents\aim_tracker

# Get dependencies
flutter pub get

# Test locally on emulator/device
flutter run

# Build release APK
flutter build apk --release
```

The APK will be at: `build\app\outputs\flutter-apk\app-release.apk`

---

## Option 2: Use Online Flutter Builder (Quick Alternative)

If you want to test quickly without installing Flutter locally:

### Using FlutLab (Online IDE)
1. Visit: https://flutlab.io/
2. Create a free account
3. Create a new project
4. Copy all the files from `c:\Users\Lenovo\Documents\aim_tracker\lib\` to the online editor
5. Update `pubspec.yaml` with the dependencies
6. Build and download the APK from the online platform

### Using Codemagic (CI/CD)
1. Visit: https://codemagic.io/
2. Connect your GitHub repository (you'll need to push the code to GitHub first)
3. Configure the build
4. Download the built APK

---

## Option 3: Pre-built APK Request

If you'd like, I can provide you with the complete source code packaged for easy upload to an online builder, or you can share your screen and I can guide you through the installation process.

---

## Quick Setup Summary

**Minimum Requirements:**
- Windows 10 or later (64-bit)
- Disk Space: ~2.5 GB for Flutter SDK
- Git for Windows (optional but recommended)
- Android Studio or VS Code

**Estimated Setup Time:** 30-45 minutes

**Commands to Run After Installation:**
\`\`\`powershell
flutter doctor -v
cd c:\Users\Lenovo\Documents\aim_tracker
flutter pub get
flutter devices
flutter run
flutter build apk --release
\`\`\`

---

## Need Help?

If you encounter any issues during installation, let me know and I can help troubleshoot specific error messages.
