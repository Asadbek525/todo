import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TodoTask } from '../todo.service';

export function taskDuplicationValidator(
  existingTasks: TodoTask[],
): ValidatorFn {
  return (control: AbstractControl): Record<string, string> | null => {
    const value = control.value || '';
    if (
      existingTasks
        .map((task) => task.title)
        .some((title) => title?.trim() === value.trim())
    ) {
      return { duplicateTask: 'Task with this title already exists' };
    }
    return null;
  };
}
