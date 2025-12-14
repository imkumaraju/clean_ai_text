class Task {
  final String id;
  final String title;
  final DateTime createdDate;
  bool isCompleted;

  Task({
    required this.id,
    required this.title,
    required this.createdDate,
    this.isCompleted = false,
  });

  // Convert Task to JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'createdDate': createdDate.toIso8601String(),
      'isCompleted': isCompleted,
    };
  }

  // Create Task from JSON
  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['id'],
      title: json['title'],
      createdDate: DateTime.parse(json['createdDate']),
      isCompleted: json['isCompleted'] ?? false,
    );
  }

  // Create a copy with modified fields
  Task copyWith({
    String? id,
    String? title,
    DateTime? createdDate,
    bool? isCompleted,
  }) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      createdDate: createdDate ?? this.createdDate,
      isCompleted: isCompleted ?? this.isCompleted,
    );
  }
}
