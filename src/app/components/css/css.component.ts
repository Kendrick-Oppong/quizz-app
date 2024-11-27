import { Component, Input } from '@angular/core';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-css',
  standalone: true,
  imports: [],
  templateUrl: './css.component.html',
  styleUrl: './css.component.css',
})
export class CssComponent {
  @Input({ required: true }) quizzes: Quiz[] = [];
}
