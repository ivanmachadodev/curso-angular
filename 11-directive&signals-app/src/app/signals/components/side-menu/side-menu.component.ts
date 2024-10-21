import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string,
  route: string
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  // menuItems: MenuItem[] = [
  //   { title: 'Contador', route: '/signals/counter' },
  //   { title: 'Usuario', route: '/signals/userinfo' },
  //   { title: 'Mutaciones', route: '/signals/properties' },
  // ];

  menuItems = signal<MenuItem[]>([
    { title: 'Contador', route: 'counter' },
    { title: 'Usuario', route: 'userinfo' },
    { title: 'Mutaciones', route: 'properties' },
  ]);
}
