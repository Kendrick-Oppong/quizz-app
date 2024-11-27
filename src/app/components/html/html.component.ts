import { Component, Input } from '@angular/core';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-html',
  standalone: true,
  imports: [],
  templateUrl: './html.component.html',
  styleUrl: './html.component.css',
})
  
export class HtmlComponent {
  @Input({ required: true }) filteredCategoryQuizzes: Quiz[] = [];
}
