import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/auth/authSlice';
import { RootState } from '../../app/store';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      dispatch(login(credentials));
      navigate('/todos');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  if (isAuthenticated) {
    navigate('/todos');
    return null;
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Вход в систему</h2>
        {error && <div className={styles.error}>{error}</div>}
        <input
          type="text"
          placeholder="Логин"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Войти
        </button>
      </form>
    </div>
  );
};