import { Component, Input } from '@angular/core';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-javascript',
  standalone: true,
  imports: [],
  templateUrl: './javascript.component.html',
  styleUrl: './javascript.component.css',
})
export class JavascriptComponent {
  @Input({ required: true }) quizzes: Quiz[] = [];
}
