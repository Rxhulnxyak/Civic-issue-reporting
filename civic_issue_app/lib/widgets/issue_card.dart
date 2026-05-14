import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:intl/intl.dart';

import '../providers/issue_provider.dart';

class IssueCard extends StatelessWidget {
  final Issue issue;
  final VoidCallback? onTap;
  final void Function(bool isUpvote)? onVote;

  const IssueCard({
    super.key,
    required this.issue,
    this.onTap,
    this.onVote,
  });

  Color _getPriorityColor(String priority) {
    switch (priority.toLowerCase()) {
      case 'critical':
        return Colors.red;
      case 'high':
        return Colors.orange;
      case 'medium':
        return Colors.yellow[700]!;
      case 'low':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'reported':
        return Colors.blue;
      case 'under review':
        return Colors.orange;
      case 'in progress':
        return Colors.purple;
      case 'resolved':
        return Colors.green;
      case 'closed':
        return Colors.grey;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.only(bottom: 16.h),
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.r),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12.r),
        child: Padding(
          padding: EdgeInsets.all(16.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header with category and priority
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.symmetric(
                      horizontal: 8.w,
                      vertical: 4.h,
                    ),
                    decoration: BoxDecoration(
                      color: _getPriorityColor(issue.priority).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(6.r),
                      border: Border.all(
                        color: _getPriorityColor(issue.priority),
                        width: 1,
                      ),
                    ),
                    child: Text(
                      issue.priority.toUpperCase(),
                      style: TextStyle(
                        fontSize: 10.sp,
                        fontWeight: FontWeight.bold,
                        color: _getPriorityColor(issue.priority),
                      ),
                    ),
                  ),
                  SizedBox(width: 8.w),
                  Container(
                    padding: EdgeInsets.symmetric(
                      horizontal: 8.w,
                      vertical: 4.h,
                    ),
                    decoration: BoxDecoration(
                      color: _getStatusColor(issue.status).withOpacity(0.1),
                      borderRadius: BorderRadius.circular(6.r),
                      border: Border.all(
                        color: _getStatusColor(issue.status),
                        width: 1,
                      ),
                    ),
                    child: Text(
                      issue.status.toUpperCase(),
                      style: TextStyle(
                        fontSize: 10.sp,
                        fontWeight: FontWeight.bold,
                        color: _getStatusColor(issue.status),
                      ),
                    ),
                  ),
                  const Spacer(),
                  Text(
                    DateFormat('MMM dd, yyyy').format(issue.createdAt),
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
              
              SizedBox(height: 12.h),
              
              // Title
              Text(
                issue.title,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              
              SizedBox(height: 8.h),
              
              // Description
              Text(
                issue.description,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey[700],
                ),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              
              SizedBox(height: 12.h),
              
              // Category and Location
              Row(
                children: [
                  Icon(
                    Icons.category,
                    size: 16.w,
                    color: Colors.grey[600],
                  ),
                  SizedBox(width: 4.w),
                  Text(
                    issue.category,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Colors.grey[600],
                    ),
                  ),
                  SizedBox(width: 16.w),
                  Icon(
                    Icons.location_on,
                    size: 16.w,
                    color: Colors.grey[600],
                  ),
                  SizedBox(width: 4.w),
                  Expanded(
                    child: Text(
                      issue.address,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Colors.grey[600],
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
              
              SizedBox(height: 12.h),
              
              // Images preview
              if (issue.imageUrls.isNotEmpty) ...[
                SizedBox(
                  height: 80.h,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: issue.imageUrls.length > 3 ? 3 : issue.imageUrls.length,
                    itemBuilder: (context, index) {
                      return Container(
                        width: 80.w,
                        height: 80.h,
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
                SizedBox(height: 12.h),
              ],
              
              // Footer with votes and user info
              Row(
                children: [
                  // Vote buttons
                  Row(
                    children: [
                      IconButton(
                        onPressed: onVote != null ? () => onVote!(true) : null,
                        icon: Icon(
                          Icons.thumb_up,
                          size: 18.w,
                          color: issue.userVote == true 
                              ? Theme.of(context).primaryColor 
                              : Colors.grey[600],
                        ),
                      ),
                      Text(
                        issue.upvotes.toString(),
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      SizedBox(width: 8.w),
                      IconButton(
                        onPressed: onVote != null ? () => onVote!(false) : null,
                        icon: Icon(
                          Icons.thumb_down,
                          size: 18.w,
                          color: issue.userVote == false 
                              ? Colors.red 
                              : Colors.grey[600],
                        ),
                      ),
                      Text(
                        issue.downvotes.toString(),
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                  
                  const Spacer(),
                  
                  // User info
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 12.r,
                        backgroundColor: Theme.of(context).primaryColor,
                        backgroundImage: issue.userAvatar != null
                            ? CachedNetworkImageProvider(issue.userAvatar!)
                            : null,
                        child: issue.userAvatar == null
                            ? Text(
                                issue.userName?.isNotEmpty == true
                                    ? issue.userName![0].toUpperCase()
                                    : 'U',
                                style: TextStyle(
                                  fontSize: 12.sp,
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                              )
                            : null,
                      ),
                      SizedBox(width: 8.w),
                      Text(
                        issue.userName ?? 'Anonymous',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
