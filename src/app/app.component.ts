import { Component, inject, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { Quiz } from './interfaces/quiz';
import { QuizService } from './services/quiz.service';
import { HtmlComponent } from './components/html/html.component';
import { JavascriptComponent } from './components/javascript/javascript.component';
import { AccessibilityComponent } from './components/accessibility/accessibility.component';
import { CssComponent } from './components/css/css.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    HtmlComponent,
    JavascriptComponent,
    AccessibilityComponent,
    CssComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'quiz-app';
  selectedCategory = '';
  quizzes: Quiz[] = [];
  filteredCategoryQuizzes: Quiz[] = [];
  quizService: QuizService = inject(QuizService);

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
  }

  onCategorySelect(categoryTitle: string): void {
    this.selectedCategory = categoryTitle;
    this.filteredCategoryQuizzes = this.quizzes.filter(
      (quiz) => quiz.title.toLowerCase() === categoryTitle.toLowerCase()
    );
   
  }
}
