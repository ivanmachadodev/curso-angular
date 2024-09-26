import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dbz-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input()
  characterList: Character[] = [
    {
      id: '',
      name: 'Trunks',
      power: 10,
    },
  ];

  @Output()
  indexCharacterToDelete: EventEmitter<string> = new EventEmitter();

  onDeleteCharacter(id: string): void {
    this.indexCharacterToDelete.emit(id);
  }
}
