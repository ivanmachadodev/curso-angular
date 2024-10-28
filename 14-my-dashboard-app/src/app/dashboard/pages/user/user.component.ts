import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/req-response';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UsersService } from '@services/users.service';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title [title]="userName()" />

    @if( user() ){
    <section>
      <img [srcset]="user()!.avatar" [alt]="user()!.first_name" />

      <div>
        <h3>{{ user()!.first_name }} {{ user()!.last_name }}</h3>
        <p>{{ user()!.email }}</p>
      </div>
    </section>
    } @else {
    <p>Cargando información</p>
    }
  `,
  styles: ``,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  //user = signal<User | undefined>(undefined);
  user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.usersService.getUserById(id))
    )
  );

  userName = computed( () => {
    let label = `Información del usuario: `;

    if ( this.user() ) {
      label = `${label} ${this.user()?.first_name} ${this.user()?.last_name}`;
    }

    return label;
  });


  // constructor(){
  //   this.route.params.subscribe( params => {
  //     console.log({ params })
  //   })
  // }
}
