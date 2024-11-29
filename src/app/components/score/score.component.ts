import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryIconComponent } from '../category-icon/category-icon.component';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CategoryIconComponent],
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent {
  @Input({ required: true }) selectedCategory = '';
  @Input({ required: true }) quizzes: Quiz[] = [];
  @Input({ required: true }) correctAnswersCount = 0;
  

  @Output() quizReset = new EventEmitter<void>();

  resetQuiz() {
    this.quizReset.emit();
  }
}
