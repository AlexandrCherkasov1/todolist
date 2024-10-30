import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, clearAllTodos } from '../../features/todos/todosSlice';
import { RootState } from '../../app/store';
import styles from './styles/TodoInput.module.css';

export const TodoInput = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.todos.filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText('');
    }
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Пополните список..."
        className={styles.input}
      />
      <button type="submit" className={styles.addButton}>
        ДОБАВИТЬ
      </button>
      <button 
        type="button" 
        className={styles.clearButton}
        onClick={() => dispatch(clearAllTodos())}
      >
        {filter === 'deleted' ? 'ОЧИСТИТЬ КОРЗИНУ' : 'ОЧИСТИТЬ'}
      </button>
    </form>
  );
};