# जनसेतु - Civic Issue Reporting Flutter App

A Flutter mobile application for crowdsourced civic issue reporting and resolution, converted from the original Next.js web application.

## Features

- **User Authentication**: Sign up and sign in with email/password
- **Issue Reporting**: Report civic issues with photos, location, and detailed descriptions
- **Community Voting**: Vote on reported issues to prioritize them
- **Real-time Updates**: Track issue status and progress
- **Location Services**: GPS-based location detection for accurate reporting
- **Photo Upload**: Attach multiple photos to issue reports
- **Category Filtering**: Filter issues by category (Road, Water, Electricity, etc.)
- **Priority Levels**: Set priority levels (Low, Medium, High, Critical)
- **User Profiles**: Manage user profiles and view reporting history

## Prerequisites

Before running this Flutter app, make sure you have:

1. **Flutter SDK** (3.0.0 or higher)
   - Download from: https://flutter.dev/docs/get-started/install
   - Add Flutter to your PATH

2. **Android Studio** or **VS Code** with Flutter extensions

3. **Supabase Account**
   - Create a project at: https://supabase.com
   - Get your project URL and anon key

## Setup Instructions

### 1. Install Flutter Dependencies

```bash
cd civic_issue_app
flutter pub get
```

### 2. Configure Supabase

1. Open `lib/config/app_config.dart`
2. Replace the placeholder values with your Supabase credentials:

```dart
static const String supabaseUrl = 'YOUR_SUPABASE_URL';
static const String supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Set up Supabase Database

Create the following tables in your Supabase database:

#### Users/Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

#### Issues Table
```sql
CREATE TABLE issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  status TEXT DEFAULT 'Reported',
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  address TEXT NOT NULL,
  image_urls TEXT[],
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Issue Votes Table
```sql
CREATE TABLE issue_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  issue_id UUID REFERENCES issues ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  is_upvote BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(issue_id, user_id)
);
```

### 4. Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE issue_votes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view all issues" ON issues FOR SELECT USING (true);
CREATE POLICY "Users can create issues" ON issues FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own issues" ON issues FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view all votes" ON issue_votes FOR SELECT USING (true);
CREATE POLICY "Users can create votes" ON issue_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own votes" ON issue_votes FOR UPDATE USING (auth.uid() = user_id);
```

## Running the App

### For Development

```bash
# Run on connected device or emulator
flutter run

# Run in debug mode
flutter run --debug

# Run in release mode
flutter run --release
```

### Building APK

#### Debug APK
```bash
flutter build apk --debug
```

#### Release APK
```bash
flutter build apk --release
```

The APK files will be generated in:
- Debug: `build/app/outputs/flutter-apk/app-debug.apk`
- Release: `build/app/outputs/flutter-apk/app-release.apk`

### Building App Bundle (for Play Store)

```bash
flutter build appbundle --release
```

The AAB file will be generated in:
`build/app/outputs/bundle/release/app-release.aab`

## Project Structure

```
lib/
├── config/           # App configuration and themes
├── providers/        # State management (Riverpod)
├── services/         # API services (Supabase)
├── screens/          # UI screens
│   ├── auth/        # Authentication screens
│   └── admin/       # Admin screens
├── widgets/          # Reusable UI components
└── main.dart        # App entry point
```

## Key Dependencies

- **flutter_riverpod**: State management
- **supabase_flutter**: Backend integration
- **go_router**: Navigation
- **image_picker**: Camera and gallery access
- **geolocator**: Location services
- **cached_network_image**: Image caching
- **flutter_screenutil**: Responsive design

## Features Implemented

✅ User Authentication (Sign up/Sign in)
✅ Issue Reporting with Photos and Location
✅ Community Voting System
✅ Category Filtering
✅ Real-time Issue Updates
✅ User Profile Management
✅ Responsive UI Design
✅ Dark/Light Theme Support

## Next Steps

1. **Install Flutter SDK** if not already installed
2. **Set up Supabase project** and configure credentials
3. **Run `flutter pub get`** to install dependencies
4. **Run `flutter run`** to start the app
5. **Build APK** using `flutter build apk --release`

## Troubleshooting

### Common Issues

1. **Flutter not found**: Make sure Flutter is installed and added to PATH
2. **Supabase connection error**: Verify your Supabase URL and anon key
3. **Permission errors**: Ensure location and camera permissions are granted
4. **Build errors**: Run `flutter clean` and `flutter pub get`

### Getting Help

- Check Flutter documentation: https://flutter.dev/docs
- Supabase documentation: https://supabase.com/docs
- Flutter troubleshooting: https://flutter.dev/docs/get-started/install/windows

## License

This project is licensed under the MIT License - see the LICENSE file for details.
