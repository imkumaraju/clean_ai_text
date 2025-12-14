import 'package:flutter/foundation.dart';
import 'package:intl/intl.dart';
import '../models/task.dart';
import '../services/storage_service.dart';

class TaskProvider extends ChangeNotifier {
  List<Task> _tasks = [];
  final StorageService _storageService = StorageService();
  bool _isLoading = false;

  List<Task> get tasks => _tasks;
  bool get isLoading => _isLoading;

  // Get today's tasks
  List<Task> get todayTasks {
    final today = DateTime.now();
    return _tasks.where((task) {
      return task.createdDate.year == today.year &&
          task.createdDate.month == today.month &&
          task.createdDate.day == today.day;
    }).toList();
  }

  // Get completed tasks for today
  List<Task> get todayCompletedTasks {
    return todayTasks.where((task) => task.isCompleted).toList();
  }

  // Get progress percentage for today
  double get todayProgress {
    if (todayTasks.isEmpty) return 0.0;
    return todayCompletedTasks.length / todayTasks.length;
  }

  // Get tasks grouped by date
  Map<String, List<Task>> get tasksByDate {
    final Map<String, List<Task>> grouped = {};
    for (var task in _tasks) {
      final dateKey = DateFormat('yyyy-MM-dd').format(task.createdDate);
      if (!grouped.containsKey(dateKey)) {
        grouped[dateKey] = [];
      }
      grouped[dateKey]!.add(task);
    }
    return grouped;
  }

  // Load tasks from storage
  Future<void> loadTasks() async {
    _isLoading = true;
    notifyListeners();

    _tasks = await _storageService.loadTasks();
    
    _isLoading = false;
    notifyListeners();
  }

  // Add a new task
  Future<void> addTask(String title) async {
    final task = Task(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: title,
      createdDate: DateTime.now(),
    );

    _tasks.add(task);
    await _storageService.saveTasks(_tasks);
    notifyListeners();
  }

  // Toggle task completion
  Future<void> toggleTask(String taskId) async {
    final taskIndex = _tasks.indexWhere((task) => task.id == taskId);
    if (taskIndex != -1) {
      _tasks[taskIndex] = _tasks[taskIndex].copyWith(
        isCompleted: !_tasks[taskIndex].isCompleted,
      );
      await _storageService.saveTasks(_tasks);
      notifyListeners();
    }
  }

  // Delete a task
  Future<void> deleteTask(String taskId) async {
    _tasks.removeWhere((task) => task.id == taskId);
    await _storageService.saveTasks(_tasks);
    notifyListeners();
  }

  // Clear all tasks
  Future<void> clearAllTasks() async {
    _tasks.clear();
    await _storageService.clearTasks();
    notifyListeners();
  }
}
