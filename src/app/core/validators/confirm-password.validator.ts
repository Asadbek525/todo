import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(
  controlName: string,
  matchingControlName: string,
): ValidatorFn {
  return (formGroup: AbstractControl): Record<string, boolean> | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    // If both controls are not dirty, do not validate
    if (!control.dirty || !matchingControl.dirty) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      return { confirmPasswordMismatch: true };
    }

    return null;
  };
}
