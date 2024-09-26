import { Character } from './../interfaces/character.interface';
import { Component } from '@angular/core';
import { DbzService } from '../services/dbzservice.service';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  characters: Character[] = [];

  constructor(private dbzService: DbzService) {
    this.characters = this.dbzService.characters;
  }

  onDeleteCharacter(id: string): void {
    this.dbzService.deleteCharacterById(id);
  }

  onAddCharacter(character: Character): void {
    this.dbzService.addCharacterToList(character)
  }
}
