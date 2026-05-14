import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../services/supabase_service.dart';

// Issue model
class Issue {
  final String id;
  final String title;
  final String description;
  final String category;
  final String priority;
  final String status;
  final double latitude;
  final double longitude;
  final String address;
  final List<String> imageUrls;
  final String userId;
  final String? userName;
  final String? userAvatar;
  final DateTime createdAt;
  final DateTime updatedAt;
  final int upvotes;
  final int downvotes;
  final bool? userVote; // null = no vote, true = upvote, false = downvote

  const Issue({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.priority,
    required this.status,
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.imageUrls,
    required this.userId,
    this.userName,
    this.userAvatar,
    required this.createdAt,
    required this.updatedAt,
    required this.upvotes,
    required this.downvotes,
    this.userVote,
  });

  factory Issue.fromJson(Map<String, dynamic> json) {
    return Issue(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String,
      category: json['category'] as String,
      priority: json['priority'] as String,
      status: json['status'] as String,
      latitude: (json['latitude'] as num).toDouble(),
      longitude: (json['longitude'] as num).toDouble(),
      address: json['address'] as String,
      imageUrls: List<String>.from(json['image_urls'] ?? []),
      userId: json['user_id'] as String,
      userName: json['profiles']?['full_name'] as String?,
      userAvatar: json['profiles']?['avatar_url'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      upvotes: json['upvotes'] ?? 0,
      downvotes: json['downvotes'] ?? 0,
      userVote: json['user_vote'],
    );
  }
}

// Issues state
class IssuesState {
  final List<Issue> issues;
  final bool isLoading;
  final String? error;
  final bool hasMore;
  final int currentPage;

  const IssuesState({
    this.issues = const [],
    this.isLoading = false,
    this.error,
    this.hasMore = true,
    this.currentPage = 0,
  });

  IssuesState copyWith({
    List<Issue>? issues,
    bool? isLoading,
    String? error,
    bool? hasMore,
    int? currentPage,
  }) {
    return IssuesState(
      issues: issues ?? this.issues,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
      hasMore: hasMore ?? this.hasMore,
      currentPage: currentPage ?? this.currentPage,
    );
  }
}

// Issues provider
final issuesProvider = StateNotifierProvider<IssuesNotifier, IssuesState>((ref) {
  return IssuesNotifier();
});

class IssuesNotifier extends StateNotifier<IssuesState> {
  IssuesNotifier() : super(const IssuesState()) {
    loadIssues();
  }

  Future<void> loadIssues({
    String? category,
    String? status,
    bool refresh = false,
  }) async {
    if (refresh) {
      state = state.copyWith(
        issues: [],
        currentPage: 0,
        hasMore: true,
        error: null,
      );
    }

    if (!state.hasMore && !refresh) return;

    state = state.copyWith(isLoading: true, error: null);

    try {
      final limit = 20;
      final offset = refresh ? 0 : state.currentPage * limit;
      
      final issuesData = await SupabaseService.getIssues(
        category: category,
        status: status,
        limit: limit,
        offset: offset,
      );

      final newIssues = issuesData.map((json) => Issue.fromJson(json)).toList();
      
      state = state.copyWith(
        issues: refresh ? newIssues : [...state.issues, ...newIssues],
        isLoading: false,
        hasMore: newIssues.length == limit,
        currentPage: refresh ? 1 : state.currentPage + 1,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  Future<void> createIssue({
    required String title,
    required String description,
    required String category,
    required String priority,
    required double latitude,
    required double longitude,
    required String address,
    List<String>? imageUrls,
  }) async {
    try {
      final issueData = await SupabaseService.createIssue(
        title: title,
        description: description,
        category: category,
        priority: priority,
        latitude: latitude,
        longitude: longitude,
        address: address,
        imageUrls: imageUrls,
      );

      final newIssue = Issue.fromJson(issueData);
      state = state.copyWith(
        issues: [newIssue, ...state.issues],
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }

  Future<void> voteOnIssue(String issueId, bool isUpvote) async {
    try {
      await SupabaseService.voteOnIssue(issueId, isUpvote);
      
      // Update local state
      final updatedIssues = state.issues.map((issue) {
        if (issue.id == issueId) {
          return Issue(
            id: issue.id,
            title: issue.title,
            description: issue.description,
            category: issue.category,
            priority: issue.priority,
            status: issue.status,
            latitude: issue.latitude,
            longitude: issue.longitude,
            address: issue.address,
            imageUrls: issue.imageUrls,
            userId: issue.userId,
            userName: issue.userName,
            userAvatar: issue.userAvatar,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
            upvotes: isUpvote ? issue.upvotes + 1 : issue.upvotes,
            downvotes: !isUpvote ? issue.downvotes + 1 : issue.downvotes,
            userVote: isUpvote,
          );
        }
        return issue;
      }).toList();

      state = state.copyWith(issues: updatedIssues);
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }

  void clearError() {
    state = state.copyWith(error: null);
  }
}

// Single issue provider
final issueProvider = FutureProvider.family<Issue?, String>((ref, issueId) async {
  try {
    final issueData = await SupabaseService.getIssue(issueId);
    if (issueData != null) {
      return Issue.fromJson(issueData);
    }
    return null;
  } catch (e) {
    throw Exception('Failed to load issue: $e');
  }
});
