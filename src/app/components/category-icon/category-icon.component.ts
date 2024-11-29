import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-icon',
  standalone: true,
  imports: [],
  templateUrl: './category-icon.component.html',
  styleUrl: './category-icon.component.css',
})
export class CategoryIconComponent {
  @Input({ required: true }) selectedCategory = '';
}
