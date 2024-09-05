import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';


export interface TodoTask {
  id?: number
  title?: string,
  description?: string,
  completed?: boolean,
  created_at?: string,
  updated_at?: string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) {

  }
  getAllTasks() {
    return this.http.get<TodoTask[]>('/tasks').pipe(
      catchError((e) => this.errorHandlerService.handleError(e, 'getAllTasks'))
    )
  }

  saveTask(task: TodoTask) {
    if (task.id) {
      return this.updateTask(task)
    } else {
      return this.createTask(task)
    }
  }
  updateTask(task: TodoTask) {
    return this.http.put(`/tasks/${task.id}`, task).pipe(
      catchError((e) => this.errorHandlerService.handleError(e, 'updateTask'))
    )
  }
  createTask(task: TodoTask) {
    return this.http.post('/tasks', task).pipe(
      catchError((e) => this.errorHandlerService.handleError(e, 'createTask'))
    )
  }
  deleteTask(id: number) {
    return this.http.delete(`/tasks/${id}`).pipe(
      catchError((e) => this.errorHandlerService.handleError(e, 'deleteTask'))
    )
  }
}
