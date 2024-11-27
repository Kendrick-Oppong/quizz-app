import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  categories = [
    { img: '/assets/images/icon-html.svg', title: 'HTML' },
    { img: '/assets/images/icon-css.svg', title: 'CSS' },
    { img: '/assets/images/icon-js.svg', title: 'Javascript' },
    { img: '/assets/images/icon-accessibility.svg', title: 'Accessibility' },
  ];
}
