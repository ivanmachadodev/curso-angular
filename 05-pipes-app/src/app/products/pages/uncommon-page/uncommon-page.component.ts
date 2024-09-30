import { Component } from '@angular/core';
import { interval, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  //I18nSelect
  name: string = 'Ivan';
  gender: 'male' | 'female' = 'male';

  invitationMap = {
    male: "invitarlo",
    female: "invitarla"
  }

  changeClient(): void{
    this.name = this.name == 'Giannina' ? 'Ivan' : 'Giannina';
    this.gender = this.gender == "female" ? 'male' : 'female';
  }

  //i18nPlural
  clients: string[] = ['Maria', 'Pedro', 'Fernando', 'Hernando', 'Eduardo', 'Melisa', 'Natalia'];
  clientsMap = {
    '=0': 'no hay clientes esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos dos clientes esperando.',
    'other': 'tenemos # clientes esperando.'
  }

  deleteClient(): void{
    this.clients.shift();
  }

  //keyValuePipe

  person = {
    name: 'Fernando',
    age: 36,
    address: 'Ottawa, Canada'
  }

  //Async pipe
  myObservableTimer: Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:', value) )
  );

  promiseValue: Promise<string> = new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve( 'Tenemos data en la promesa.');
    }, 3500);
  });

}
