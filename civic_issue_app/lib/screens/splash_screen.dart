import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';

import '../providers/auth_provider.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({super.key});

  @override
  ConsumerState<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToNextScreen();
  }

  Future<void> _navigateToNextScreen() async {
    await Future.delayed(const Duration(seconds: 3));
    
    if (mounted) {
      final authState = ref.read(authStateProvider);
      if (authState.isAuthenticated) {
        context.go('/home');
      } else {
        context.go('/auth/login');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF2563EB),
              Color(0xFF10B981),
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // App Logo/Icon
              Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(30),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.1),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.report_problem,
                  size: 60,
                  color: Color(0xFF2563EB),
                ),
              )
                  .animate()
                  .scale(
                    duration: 600.ms,
                    curve: Curves.elasticOut,
                  )
                  .then()
                  .shimmer(
                    duration: 2000.ms,
                    color: Colors.white.withOpacity(0.5),
                  ),
              
              const SizedBox(height: 32),
              
              // App Name
              const Text(
                'जनसेतु',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                  letterSpacing: 2,
                ),
              )
                  .animate()
                  .fadeIn(
                    duration: 800.ms,
                    delay: 300.ms,
                  )
                  .slideY(
                    begin: 0.3,
                    end: 0,
                    duration: 800.ms,
                    delay: 300.ms,
                  ),
              
              const SizedBox(height: 8),
              
              // App Description
              const Text(
                'Civic Issue Reporting Platform',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.white70,
                  letterSpacing: 1,
                ),
              )
                  .animate()
                  .fadeIn(
                    duration: 800.ms,
                    delay: 600.ms,
                  )
                  .slideY(
                    begin: 0.3,
                    end: 0,
                    duration: 800.ms,
                    delay: 600.ms,
                  ),
              
              const SizedBox(height: 60),
              
              // Loading Indicator
              const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                strokeWidth: 3,
              )
                  .animate()
                  .fadeIn(
                    duration: 600.ms,
                    delay: 1000.ms,
                  )
                  .scale(
                    duration: 600.ms,
                    delay: 1000.ms,
                  ),
              
              const SizedBox(height: 16),
              
              const Text(
                'Loading...',
                style: TextStyle(
                  fontSize: 14,
                  color: Colors.white60,
                ),
              )
                  .animate()
                  .fadeIn(
                    duration: 600.ms,
                    delay: 1200.ms,
                  ),
            ],
          ),
        ),
      ),
    );
  }
}
