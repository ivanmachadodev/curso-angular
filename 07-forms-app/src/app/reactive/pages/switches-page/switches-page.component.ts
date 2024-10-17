import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {
  myForm!: FormGroup;

  person = {
    gender: '',
    wantsNotifications: false
  }

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      gender: ['', Validators.required],
      wantsNotifications: [true, Validators.required],
      termsAndConditions: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isInvalidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'requiredTrue':
          return 'Debe aceptar los terminos y condiciones';
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myForm.value;

    this.person = newPerson;

    console.log(this.myForm.value);
    console.log(newPerson);

  }
}
