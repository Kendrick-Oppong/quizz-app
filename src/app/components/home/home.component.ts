import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
  
export class HomeComponent {
  @Output() categorySelected = new EventEmitter<string>();

  readonly categories = [
    { img: '/assets/images/icon-html.svg', title: 'HTML' },
    { img: '/assets/images/icon-css.svg', title: 'CSS' },
    { img: '/assets/images/icon-js.svg', title: 'JavaScript' },
    { img: '/assets/images/icon-accessibility.svg', title: 'Accessibility' },
  ];

  onCategorySelect(categoryTitle: string): void {
    this.categorySelected.emit(categoryTitle);
  }
}
