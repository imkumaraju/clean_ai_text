# Android Studio Command-Line Tools Setup

## Issue
Android Studio is installed but the command-line tools are missing.

## Solution

### Step 1: Install Command-Line Tools in Android Studio

1. **Open Android Studio**
2. Click on **More Actions** → **SDK Manager** (or go to **File** → **Settings** → **Appearance & Behavior** → **System Settings** → **Android SDK**)
3. In the SDK Manager window:
   - Click on the **SDK Tools** tab
   - Check the box for **Android SDK Command-line Tools (latest)**
   - Also ensure these are checked:
     - Android SDK Build-Tools
     - Android SDK Platform-Tools
     - Android Emulator (optional)
4. Click **Apply** and **OK** to install
5. Wait for the installation to complete

### Step 2: Accept Licenses

After installation, close Android Studio and run in PowerShell:

```powershell
C:\flutter\bin\flutter.bat doctor --android-licenses
```

Press `y` to accept each license when prompted.

### Step 3: Verify Setup

```powershell
C:\flutter\bin\flutter.bat doctor -v
```

You should see a green checkmark ✓ for "Android toolchain".

### Step 4: Build APK

```powershell
cd c:\Users\Lenovo\Documents\aim_tracker
C:\flutter\bin\flutter.bat build apk --release
```

---

## Quick Visual Guide

**SDK Manager Location:**
- Android Studio → Welcome Screen → More Actions → SDK Manager
- OR: File → Settings → System Settings → Android SDK

**What to Install:**
- ✅ Android SDK Command-line Tools (latest)
- ✅ Android SDK Build-Tools
- ✅ Android SDK Platform-Tools
- ✅ At least one Android SDK Platform (e.g., Android 14.0 / API 34)

---

## After Setup

Once you've installed the command-line tools, let me know and I'll continue with the APK build!
