import { Component } from '@angular/core';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent {

  publishers = [
    {id: 'DC Comics', desc: 'DC Cómics'},
    {id: 'Marvel Comics', desc: 'Marvel Cómics'},
  ]

}
