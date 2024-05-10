import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = '';

  @Output() searchPerformed: EventEmitter<string> = new EventEmitter<string>();

  search(): void {
    this.searchPerformed.emit(this.searchQuery);
  }
}
