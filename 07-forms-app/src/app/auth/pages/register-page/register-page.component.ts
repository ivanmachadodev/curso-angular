import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService
  ){
    this.myForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidatorService()]],
      username: ['', [Validators.required, this.validatorService.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: [
        this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')
      ]
    });
  }

  isInvalidField(field: string){
    return this.validatorService.isInvalidField(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
