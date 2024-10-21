import { Component, computed, effect, OnDestroy, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent implements OnDestroy{
  user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });

  counter = signal(10);

  fullName = computed(
    () => `${this.user().first_name} ${this.user().last_name}`
  );

  userChangedEffect = effect ( () => {
    console.log( `${ this.user().first_name } - ${ this.counter() }` )
  })

  ngOnDestroy(): void {
    //this.userChangedEffect.destroy();
  };

  onFieldUpdated(field: keyof User, value: string) {
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value
    // }) )

    this.user.update((current) => {
      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }

      return current;
    });
  }

  increaseBy( value: number ){
    this.counter.update( current => current + value );
  }
}
