import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { TodoInput } from './TodoInput';
import { TodoTabs } from './TodoTabs';
import { TodoItem } from './TodoItem';
import { TodoStatus } from '../../types/todo.types';
import styles from './styles/TodoList.module.css';

export const TodoList = () => {
  const { items, filter } = useSelector((state: RootState) => state.todos);

  const filteredTodos = items.filter(todo => {
    switch (filter) {
      case 'current':
        return todo.status === TodoStatus.ACTIVE;
      case 'completed':
        return todo.status === TodoStatus.COMPLETED;
      case 'deleted':
        return todo.status === TodoStatus.DELETED;
      case 'all':
        // Показываем все задачи, кроме удаленных
        return todo.status !== TodoStatus.DELETED;
      default:
        return false;
    }
  });

  return (
    <div className={styles.container}>
      <TodoInput />
      <TodoTabs />
      <div className={styles.todoList}>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {filteredTodos.length === 0 && (
          <div className={styles.emptyState}>
            Список пуст
          </div>
        )}
      </div>
    </div>
  );
};