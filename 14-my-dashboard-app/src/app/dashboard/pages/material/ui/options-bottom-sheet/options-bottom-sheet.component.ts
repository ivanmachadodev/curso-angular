import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-options-bottom-sheet',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './options-bottom-sheet.component.html',
})
export class OptionsBottomSheetComponent {

  openLink(event: MouseEvent): void {
    console.log('openLink', event)
  }

}
