import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TodoService, TodoTask} from './todo.service';
import {map, take} from 'rxjs';
import {AsyncPipe, DatePipe, JsonPipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {SaveTodoDialogComponent} from './save-todo-dialog/save-todo-dialog.component';
import {RouterLink} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {expandCollapseAnimation} from "../../shared/animations";
import {DATE_FORMAT} from "../../core/constants";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {HeaderDirective} from "../../core/directives/header.directive";
import {Store} from "@ngrx/store";
import {TodoState} from "./store/todo.reducer";
import {updateTodoTasks} from "./store/todo.actions";
import {LangSelectComponent} from "../../shared/components/lang-select/lang-select.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, AsyncPipe, RouterLink, DatePipe, DateFormatPipe, HeaderDirective, JsonPipe, LangSelectComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  animations: [expandCollapseAnimation],
})
export class TodoComponent implements OnInit {
  expandedElement?: TodoTask
  todoTasks$;

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private authService: AuthService,
    private store: Store<{ todoTasks: TodoState }>,
  ) {
    this.todoTasks$ = this.store.select('todoTasks').pipe(map(state => state.todoTasks))
  }


  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this.todoService.getAllTasks().subscribe({
      next: (res) => {
        if (res) {
          this.store.dispatch(updateTodoTasks({tasks: res}))
        }
      }
    })
  }

  openSaveDialog(event: MouseEvent, data?: TodoTask,) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(SaveTodoDialogComponent, {
      width: '600px',
      data: data ?? {}
    })
    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: (res: TodoTask) => {
        if (res) {
          this.getTodos()
        }
      }
    })
  }

  deleteTask(event: MouseEvent, id: number | undefined) {
    event.stopPropagation()
    this.todoService.deleteTask(id as number).subscribe({
      next: (res) => {
        if (res === null)
          this.getTodos()
      }
    })
  }

  async logout() {
    await this.authService.logout();
  }

  toggleExpandedTask(task: TodoTask) {
    if (this.expandedElement && this.expandedElement.id === task.id) {
      this.expandedElement = undefined
    } else {
      this.expandedElement = task
    }

  }

  protected readonly DATE_FORMAT = DATE_FORMAT;
}

