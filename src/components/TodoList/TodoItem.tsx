import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../../features/todos/todosSlice';
import { Todo } from '../../types/todo.types';
import styles from './styles/TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoContent}>
        <button 
          className={`${styles.checkbox} ${todo.status === 'completed' ? styles.checked : ''}`}
          onClick={() => dispatch(toggleTodo(todo.id))}
        >
          {todo.status === 'completed' && '✓'}
        </button>
        <span className={`${styles.todoText} ${todo.status === 'completed' ? styles.completed : ''}`}>
          {todo.text}
        </span>
      </div>
      <button 
        className={styles.deleteButton}
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        ✕
      </button>
    </div>
  );
};