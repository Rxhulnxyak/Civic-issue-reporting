// Configuration Template for जनसेतु Flutter App
// Copy this to lib/config/app_config.dart and replace with your actual values

class AppConfig {
  // Supabase Configuration
  // Get these from your Supabase project settings
  static const String supabaseUrl = 'https://your-project-id.supabase.co';
  static const String supabaseAnonKey = 'your-anon-key-here';
  
  // App Configuration
  static const String appName = 'जनसेतु';
  static const String appVersion = '1.0.0';
  static const String appDescription = 'Crowdsourced Civic Issue Reporting & Resolution Platform';
  
  // API Configuration
  static const int apiTimeout = 30000; // 30 seconds
  static const int maxImageSize = 5 * 1024 * 1024; // 5MB
  
  // Location Configuration
  static const double defaultLatitude = 23.0225; // Delhi coordinates
  static const double defaultLongitude = 72.5714;
  static const double locationAccuracy = 10.0; // meters
  
  // Issue Categories
  static const List<String> issueCategories = [
    'Road & Infrastructure',
    'Water & Sanitation',
    'Electricity',
    'Waste Management',
    'Public Safety',
    'Healthcare',
    'Education',
    'Environment',
    'Transportation',
    'Other'
  ];
  
  // Issue Status
  static const List<String> issueStatuses = [
    'Reported',
    'Under Review',
    'In Progress',
    'Resolved',
    'Closed'
  ];
  
  // Priority Levels
  static const List<String> priorityLevels = [
    'Low',
    'Medium',
    'High',
    'Critical'
  ];
}

/*
SETUP INSTRUCTIONS:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your Project URL and replace 'https://your-project-id.supabase.co'
4. Copy your anon/public key and replace 'your-anon-key-here'
5. Save this file as lib/config/app_config.dart
6. Run the database_schema.sql in your Supabase SQL editor
7. Run 'flutter pub get' to install dependencies
8. Run 'flutter run' to start the app

For more detailed instructions, see README.md
*/
