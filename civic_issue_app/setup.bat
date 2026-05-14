@echo off
echo Setting up जनसेतु Flutter App...
echo.

echo Step 1: Checking Flutter installation...
flutter --version
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Flutter is not installed or not in PATH
    echo Please install Flutter from: https://flutter.dev/docs/get-started/install
    pause
    exit /b 1
)
echo ✅ Flutter is installed
echo.

echo Step 2: Getting Flutter dependencies...
flutter pub get
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to get dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

echo Step 3: Checking for connected devices...
flutter devices
echo.

echo Step 4: Running Flutter doctor...
flutter doctor
echo.

echo ✅ Setup completed!
echo.
echo Next steps:
echo 1. Configure Supabase credentials in lib/config/app_config.dart
echo 2. Set up your Supabase database tables (see README.md)
echo 3. Run 'flutter run' to start the app
echo 4. Run 'build_apk.bat' to build APK
echo.

pause
