class Done {
  constructor(taskName, description, completedBy, completedAt = new Date()) {
    this.taskName = taskName; // Name of the completed task
    this.description = description; // Task Description
    this.completedBy = completedBy; // User ID who completed the task
    this.completedAt = completedAt; // Timestamp
  }
}

export default Done;
