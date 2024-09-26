import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent {

  @Output()
  newCharacter: EventEmitter<Character> = new EventEmitter();

  character: Character = {
    id: '',
    name: '',
    power: 0
  }

  emitCharacter() : void {

    if(this.character.name.length === 0) return;

    this.newCharacter.emit(this.character);

    this.character = {id: '', name: '', power: 0}
  }
}
