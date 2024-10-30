import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../features/todos/todosSlice';
import { RootState } from '../../app/store';
import { TodoStatus } from '../../types/todo.types';
import styles from './styles/TodoTabs.module.css';

export const TodoTabs = () => {
  const dispatch = useDispatch();
  const { items, filter } = useSelector((state: RootState) => state.todos);
  
  // Обновляем подсчет количества задач для каждой категории
  const counts = {
    current: items.filter(todo => todo.status === TodoStatus.ACTIVE).length,
    // Теперь считаем все дела без учета удаленных
    all: items.filter(todo => todo.status !== TodoStatus.DELETED).length,
    completed: items.filter(todo => todo.status === TodoStatus.COMPLETED).length,
    deleted: items.filter(todo => todo.status === TodoStatus.DELETED).length,
  };

  return (
    <div className={styles.tabs}>
      <button 
        className={`${styles.tab} ${filter === 'current' ? styles.active : ''}`}
        onClick={() => dispatch(setFilter('current'))}
      >
        ТЕКУЩИЕ ДЕЛА ({counts.current})
      </button>
      <button 
        className={`${styles.tab} ${filter === 'all' ? styles.active : ''}`}
        onClick={() => dispatch(setFilter('all'))}
      >
        ВСЕ ДЕЛА ({counts.all})
      </button>
      <button 
        className={`${styles.tab} ${filter === 'completed' ? styles.active : ''}`}
        onClick={() => dispatch(setFilter('completed'))}
      >
        ВЫПОЛНЕННЫЕ ДЕЛА ({counts.completed})
      </button>
      <button 
        className={`${styles.tab} ${filter === 'deleted' ? styles.active : ''}`}
        onClick={() => dispatch(setFilter('deleted'))}
      >
        КОРЗИНА ({counts.deleted})
      </button>
    </div>
  );
};