import { Injectable } from '@angular/core';
import { Character } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root',
})
export class DbzService {
  characters: Character[] = [
    {
      id: uuid(),
      name: 'Krilin',
      power: 1000,
    },
    {
      id: uuid(),
      name: 'Goku',
      power: 9500,
    },
    {
      id: uuid(),
      name: 'Vegeta',
      power: 7500,
    },
  ];

  addCharacterToList(character: Character): void {
    const newCharacter: Character = {... character, id: uuid()}
    this.characters.push(newCharacter);
  }

  deleteCharacterById(id: string): void {
    // const index = this.characters.findIndex(character => character.id === id);
    // this.characters.splice(index, 1);
    this.characters = this.characters.filter(character => character.id !== id)
  }

}
