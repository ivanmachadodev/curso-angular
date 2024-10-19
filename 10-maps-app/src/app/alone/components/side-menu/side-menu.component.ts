import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [
    { name: 'FullScreen', route: '/maps/fullscreen' },
    { name: 'Zoom', route: '/maps/zoom' },
    { name: 'Markers', route: '/maps/markers' },
    { name: 'Houses', route: '/maps/properties' },
    { name: 'AlonePage', route: '/alone' },
  ];
}
