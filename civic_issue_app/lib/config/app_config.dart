class AppConfig {
  // Supabase Configuration
  // Replace these with your actual Supabase project credentials
  static const String supabaseUrl = 'https://sraabiarpxhedfnbecrv.supabase.co';
  static const String supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyYWFiaWFycHhoZWRmbmJlY3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODU3MTgsImV4cCI6MjA3Mzk2MTcxOH0.nk-9XaI2jTz0RfKjOdrorjmzc1UWzNei4GcERJoQ22o';
  
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
