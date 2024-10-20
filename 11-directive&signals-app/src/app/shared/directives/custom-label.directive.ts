import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }

  setErrorMessage(): void {

    if( !this.htmlElement ) return;
    if( !this._errors ) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors)

    if (errors.length > 0) {
      switch (errors[0]) {
        case 'required':
          this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
          break;
        case 'minlength':
          this.htmlElement.nativeElement.innerText = `Minimo ${this._errors['minlength'].requiredLength} caracteres`;
          break;
        case 'email':
          this.htmlElement.nativeElement.innerText = 'Debe ser un email valido';
          break;
        default:
          this.htmlElement.nativeElement.innerText = '';
          break;
      }
    }
  }

  setStyle(): void{

    if( !this.htmlElement) return;

    this.htmlElement.nativeElement.style.color = this._color;
  }

}
