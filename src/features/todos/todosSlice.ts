import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoStatus } from '../../types/todo.types';

interface TodosState {
  items: Todo[];
  filter: 'current' | 'all' | 'completed' | 'deleted';
}

const loadInitialState = (): Todo[] => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
};

const initialState: TodosState = {
  items: loadInitialState(),
  filter: 'all'
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        status: TodoStatus.ACTIVE,
        createdAt: Date.now()
      };
      state.items.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        if (todo.status === TodoStatus.DELETED) {
          state.items = state.items.filter(t => t.id !== action.payload);
        } else {
          todo.status = TodoStatus.DELETED;
        }
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.status = todo.status === TodoStatus.ACTIVE ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    clearAllTodos: (state) => {
      if (state.filter === 'deleted') {
        state.items = state.items.filter(todo => todo.status !== TodoStatus.DELETED);
      } else {
        state.items.forEach(todo => {
          if (
            state.filter === 'all' || 
            (state.filter === 'current' && todo.status === TodoStatus.ACTIVE) ||
            (state.filter === 'completed' && todo.status === TodoStatus.COMPLETED)
          ) {
            todo.status = TodoStatus.DELETED;
          }
        });
      }
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    
    setFilter: (state, action: PayloadAction<TodosState['filter']>) => {
      state.filter = action.payload;
    }
  }
});

export const { addTodo, deleteTodo, toggleTodo, clearAllTodos, setFilter } = todosSlice.actions;
export default todosSlice.reducer;