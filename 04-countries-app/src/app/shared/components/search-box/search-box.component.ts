import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent {
  @Input()
  placheholder: string = '';

  @Output()
  searchTerm: EventEmitter<string> = new EventEmitter();

  emitSearch(searchValue: string): void{

    this.searchTerm.emit( searchValue );

  }
}
