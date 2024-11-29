import { Component, inject, OnInit } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { Quiz } from './interfaces/quiz';
import { QuizService } from './services/quiz.service';
import { QuestionsComponent } from './components/questions/questions.component';
import { ScoreComponent } from "./components/score/score.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuestionsComponent, HomeComponent, ScoreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  selectedCategory = '';
  quizzes: Quiz[] = [];
  filteredCategoryQuizzes: Quiz[] = [];
  showScoreComponent = false;
  quizService: QuizService = inject(QuizService);

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
    this.loadCategoryAndProgress();
  }

  onCategorySelect(categoryTitle: string): void {
    this.selectedCategory = categoryTitle;
    this.filteredCategoryQuizzes = this.quizzes.filter(
      (quiz) => quiz.title.toLowerCase() === categoryTitle.toLowerCase()
    );

    this.saveCategoryAndProgress();
  }

  onQuizFinished(): void {
    this.showScoreComponent = true;
  }

  private saveCategoryAndProgress(): void {
    const appState = {
      selectedCategory: this.selectedCategory,
    };
    localStorage.setItem('appState', JSON.stringify(appState));
  }

  private loadCategoryAndProgress(): void {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      const appState = JSON.parse(savedState);
      this.selectedCategory = appState.selectedCategory || '';

      if (this.selectedCategory) {
        this.filteredCategoryQuizzes = this.quizzes.filter(
          (quiz) =>
            quiz.title.toLowerCase() === this.selectedCategory.toLowerCase()
        );
      }
    }
  }
}
