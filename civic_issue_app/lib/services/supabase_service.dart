import 'package:supabase_flutter/supabase_flutter.dart';
import '../config/app_config.dart';

class SupabaseService {
  static final SupabaseClient _client = Supabase.instance.client;
  
  static SupabaseClient get client => _client;
  
  // Authentication Methods
  static Future<AuthResponse> signUp({
    required String email,
    required String password,
    Map<String, dynamic>? metadata,
  }) async {
    return await _client.auth.signUp(
      email: email,
      password: password,
      data: metadata,
    );
  }
  
  static Future<AuthResponse> signIn({
    required String email,
    required String password,
  }) async {
    return await _client.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }
  
  static Future<void> signOut() async {
    await _client.auth.signOut();
  }
  
  static User? get currentUser => _client.auth.currentUser;
  
  static Stream<AuthState> get authStateChanges => _client.auth.onAuthStateChange;
  
  // Issue Management Methods
  static Future<List<Map<String, dynamic>>> getIssues({
    String? category,
    String? status,
    int? limit,
    int? offset,
  }) async {
    var query = _client
        .from('issues')
        .select('*, profiles(*)')
        .order('created_at', ascending: false);
    
    if (category != null) {
      query = query.eq('category', category);
    }
    
    if (status != null) {
      query = query.eq('status', status);
    }
    
    if (limit != null) {
      query = query.limit(limit);
    }
    
    if (offset != null) {
      query = query.range(offset, offset + (limit ?? 10) - 1);
    }
    
    final response = await query;
    return List<Map<String, dynamic>>.from(response);
  }
  
  static Future<Map<String, dynamic>?> getIssue(String id) async {
    final response = await _client
        .from('issues')
        .select('*, profiles(*), issue_votes(*)')
        .eq('id', id)
        .single();
    
    return response;
  }
  
  static Future<Map<String, dynamic>> createIssue({
    required String title,
    required String description,
    required String category,
    required String priority,
    required double latitude,
    required double longitude,
    required String address,
    List<String>? imageUrls,
  }) async {
    final user = currentUser;
    if (user == null) throw Exception('User not authenticated');
    
    final response = await _client.from('issues').insert({
      'title': title,
      'description': description,
      'category': category,
      'priority': priority,
      'latitude': latitude,
      'longitude': longitude,
      'address': address,
      'image_urls': imageUrls,
      'user_id': user.id,
      'status': 'Reported',
    }).select().single();
    
    return response;
  }
  
  static Future<void> updateIssueStatus(String id, String status) async {
    await _client
        .from('issues')
        .update({'status': status})
        .eq('id', id);
  }
  
  // Voting System
  static Future<void> voteOnIssue(String issueId, bool isUpvote) async {
    final user = currentUser;
    if (user == null) throw Exception('User not authenticated');
    
    // Check if user already voted
    final existingVote = await _client
        .from('issue_votes')
        .select()
        .eq('issue_id', issueId)
        .eq('user_id', user.id)
        .maybeSingle();
    
    if (existingVote != null) {
      // Update existing vote
      await _client
          .from('issue_votes')
          .update({'is_upvote': isUpvote})
          .eq('issue_id', issueId)
          .eq('user_id', user.id);
    } else {
      // Create new vote
      await _client.from('issue_votes').insert({
        'issue_id': issueId,
        'user_id': user.id,
        'is_upvote': isUpvote,
      });
    }
  }
  
  // Profile Management
  static Future<Map<String, dynamic>?> getProfile(String userId) async {
    final response = await _client
        .from('profiles')
        .select()
        .eq('id', userId)
        .maybeSingle();
    
    return response;
  }
  
  static Future<void> updateProfile({
    required String userId,
    String? fullName,
    String? phone,
    String? avatarUrl,
  }) async {
    await _client.from('profiles').upsert({
      'id': userId,
      'full_name': fullName,
      'phone': phone,
      'avatar_url': avatarUrl,
      'updated_at': DateTime.now().toIso8601String(),
    });
  }
  
  // File Upload
  static Future<String> uploadFile(String bucket, String path, List<int> fileBytes) async {
    final response = await _client.storage
        .from(bucket)
        .uploadBinary(path, fileBytes);
    
    return _client.storage.from(bucket).getPublicUrl(path);
  }
}
