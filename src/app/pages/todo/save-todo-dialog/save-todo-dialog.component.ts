import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TodoService, TodoTask} from '../todo.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {taskDuplicationValidator} from "../validators";
import {TodoState} from "../store/todo.reducer";
import {Store} from "@ngrx/store";
import {map, take} from "rxjs";

@Component({
  selector: 'app-save-todo-dialog',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInput, MatButton, ReactiveFormsModule],
  templateUrl: './save-todo-dialog.component.html',
  styleUrl: './save-todo-dialog.component.scss'
})
export class SaveTodoDialogComponent {

  form?: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TodoTask,
    private dialogRef: MatDialogRef<SaveTodoDialogComponent>,
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private store: Store<{ todoTasks: TodoState }>
  ) {
    this.store.select('todoTasks').pipe(take(1),
      map(state => state.todoTasks)).subscribe(tasks => {
      this.form = this.formBuilder.group({
        title: [data.title, [Validators.required, taskDuplicationValidator(tasks)]],
        description: [data.description, [Validators.required, Validators.maxLength(250)]]
      })
    })
  }

  saveTask() {
    const task = {...this.data, ...this.form?.value};
    this.todoService.saveTask(task).subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
      }
    })
  }
}
