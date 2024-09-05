import { createAction, props } from '@ngrx/store';
import { TodoTask } from '../todo.service';

export const updateTodoTasks = createAction(
  '[Todo Component] UpdateTodoTasks',
  props<{ tasks: TodoTask[] }>(),
);
export const removeTodoTask = createAction(
  '[Todo Component] RemoveTodoTask',
  props<{ task: TodoTask }>(),
);
export const addTodoTask = createAction(
  '[Todo Component] AddTodoTask',
  props<{ task: TodoTask }>(),
);
export const reset = createAction('[Todo Component] Reset');
