import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:intl/intl.dart';

import '../providers/issue_provider.dart';

class IssueDetailsScreen extends ConsumerWidget {
  final String issueId;

  const IssueDetailsScreen({
    super.key,
    required this.issueId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final issueAsync = ref.watch(issueProvider(issueId));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Issue Details'),
      ),
      body: issueAsync.when(
        data: (issue) {
          if (issue == null) {
            return const Center(
              child: Text('Issue not found'),
            );
          }

          return SingleChildScrollView(
            padding: EdgeInsets.all(16.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Title
                Text(
                  issue.title,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                
                SizedBox(height: 16.h),
                
                // Status and Priority
                Row(
                  children: [
                    _buildStatusChip(context, issue.status),
                    SizedBox(width: 8.w),
                    _buildPriorityChip(context, issue.priority),
                  ],
                ),
                
                SizedBox(height: 16.h),
                
                // Description
                Text(
                  'Description',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8.h),
                Text(
                  issue.description,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                
                SizedBox(height: 16.h),
                
                // Location
                Text(
                  'Location',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8.h),
                Row(
                  children: [
                    const Icon(Icons.location_on, color: Colors.red),
                    SizedBox(width: 8.w),
                    Expanded(
                      child: Text(issue.address),
                    ),
                  ],
                ),
                
                SizedBox(height: 16.h),
                
                // Images
                if (issue.imageUrls.isNotEmpty) ...[
                  Text(
                    'Photos',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8.h),
                  SizedBox(
                    height: 200.h,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: issue.imageUrls.length,
                      itemBuilder: (context, index) {
                        return Container(
                          width: 200.w,
                          height: 200.h,
                          margin: EdgeInsets.only(right: 8.w),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8.r),
                            border: Border.all(color: Colors.grey[300]!),
                          ),
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(8.r),
                            child: CachedNetworkImage(
                              imageUrl: issue.imageUrls[index],
                              fit: BoxFit.cover,
                              placeholder: (context, url) => Container(
                                color: Colors.grey[200],
                                child: const Center(
                                  child: CircularProgressIndicator(),
                                ),
                              ),
                              errorWidget: (context, url, error) => Container(
                                color: Colors.grey[200],
                                child: const Icon(Icons.error),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  SizedBox(height: 16.h),
                ],
                
                // Vote Section
                Card(
                  child: Padding(
                    padding: EdgeInsets.all(16.w),
                    child: Column(
                      children: [
                        Text(
                          'Community Support',
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 16.h),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Column(
                              children: [
                                IconButton(
                                  onPressed: () {
                                    ref.read(issuesProvider.notifier).voteOnIssue(
                                      issue.id,
                                      true,
                                    );
                                  },
                                  icon: Icon(
                                    Icons.thumb_up,
                                    color: issue.userVote == true 
                                        ? Theme.of(context).primaryColor 
                                        : Colors.grey,
                                  ),
                                ),
                                Text(issue.upvotes.toString()),
                                const Text('Support'),
                              ],
                            ),
                            Column(
                              children: [
                                IconButton(
                                  onPressed: () {
                                    ref.read(issuesProvider.notifier).voteOnIssue(
                                      issue.id,
                                      false,
                                    );
                                  },
                                  icon: Icon(
                                    Icons.thumb_down,
                                    color: issue.userVote == false 
                                        ? Colors.red 
                                        : Colors.grey,
                                  ),
                                ),
                                Text(issue.downvotes.toString()),
                                const Text('Oppose'),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                
                SizedBox(height: 16.h),
                
                // Issue Info
                Card(
                  child: Padding(
                    padding: EdgeInsets.all(16.w),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Issue Information',
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 12.h),
                        _buildInfoRow('Category', issue.category),
                        _buildInfoRow('Priority', issue.priority),
                        _buildInfoRow('Reported by', issue.userName ?? 'Anonymous'),
                        _buildInfoRow('Reported on', DateFormat('MMM dd, yyyy HH:mm').format(issue.createdAt)),
                        _buildInfoRow('Last updated', DateFormat('MMM dd, yyyy HH:mm').format(issue.updatedAt)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
        loading: () => const Center(
          child: CircularProgressIndicator(),
        ),
        error: (error, stack) => Center(
          child: Text('Error loading issue: $error'),
        ),
      ),
    );
  }

  Widget _buildStatusChip(BuildContext context, String status) {
    Color color;
    switch (status.toLowerCase()) {
      case 'reported':
        color = Colors.blue;
        break;
      case 'under review':
        color = Colors.orange;
        break;
      case 'in progress':
        color = Colors.purple;
        break;
      case 'resolved':
        color = Colors.green;
        break;
      case 'closed':
        color = Colors.grey;
        break;
      default:
        color = Colors.grey;
    }

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: color),
      ),
      child: Text(
        status,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.bold,
          fontSize: 12.sp,
        ),
      ),
    );
  }

  Widget _buildPriorityChip(BuildContext context, String priority) {
    Color color;
    switch (priority.toLowerCase()) {
      case 'critical':
        color = Colors.red;
        break;
      case 'high':
        color = Colors.orange;
        break;
      case 'medium':
        color = Colors.yellow[700]!;
        break;
      case 'low':
        color = Colors.green;
        break;
      default:
        color = Colors.grey;
    }

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16.r),
        border: Border.all(color: color),
      ),
      child: Text(
        priority,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.bold,
          fontSize: 12.sp,
        ),
      ),
    );
  }

  Widget _buildInfoRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.only(bottom: 8.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100.w,
            child: Text(
              '$label:',
              style: const TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
          Expanded(
            child: Text(value),
          ),
        ],
      ),
    );
  }
}
