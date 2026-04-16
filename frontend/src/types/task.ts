export interface TaskAssignee {
  _id?: string;
  name?: string;
  email?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled' | string;
  priority?: 'Low' | 'Medium' | 'High' | string;
  dueDate?: string;
  assignee?: TaskAssignee;
  createdAt?: string;
}
