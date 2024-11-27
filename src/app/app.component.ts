import { Component, inject, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { Quiz } from './interfaces/quiz';
import { QuizService } from './services/quiz.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'quiz-app';
  selectedCategory: string = '';
  quizzes: Quiz[] = [];
  quizService: QuizService = inject(QuizService);

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
  }
  onCategorySelect(categoryTitle: string): void {
    this.selectedCategory = categoryTitle;
    alert(this.selectedCategory);
  }
}
