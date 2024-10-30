export enum TodoStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DELETED = 'deleted'
}

export interface Todo {
  id: string;
  text: string;
  status: TodoStatus;
  createdAt: number;
}

export type TodoFilter = 'current' | 'all' | 'completed' | 'deleted';