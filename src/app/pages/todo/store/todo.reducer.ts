import { createReducer, on } from '@ngrx/store';
import {
  updateTodoTasks,
  removeTodoTask,
  addTodoTask,
  reset,
} from './todo.actions';
import { TodoTask } from '../todo.service';

export interface TodoState {
  todoTasks: TodoTask[];
}

export const initialState: TodoState = {
  todoTasks: [],
};

export const todoReducer = createReducer(
  initialState,
  on(updateTodoTasks, (state, { tasks }) => ({ ...state, todoTasks: tasks })),
  on(removeTodoTask, (state, { task }) => ({
    ...state,
    todoTasks: state.todoTasks.filter((t) => t.id !== task.id),
  })),
  on(addTodoTask, (state, { task }) => ({
    ...state,
    todoTasks: [...state.todoTasks, task],
  })),
  on(reset, () => initialState),
);
