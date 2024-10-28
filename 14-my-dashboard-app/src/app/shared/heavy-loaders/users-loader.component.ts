import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';

@Component({
    selector: 'app-user-loader',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>user-loader works!</p>`,
})
export class UsersLoaderComponent { }
