import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { LoginForm } from './components/Auth/LoginForm';
import { TodoList } from './components/TodoList/TodoList';
import { PrivateRoute } from './routes/PrivateRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodoList />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/todos" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;