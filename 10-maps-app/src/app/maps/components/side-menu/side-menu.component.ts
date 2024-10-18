import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [
    { name: 'FullScreen', route: '/maps/fullscreen' },
    { name: 'Zoom', route: '/maps/zoom' },
    { name: 'Markers', route: '/maps/markers' },
    { name: 'Houses', route: '/maps/properties' },
  ];
}
