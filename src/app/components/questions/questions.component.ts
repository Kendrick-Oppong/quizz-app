import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-questions',
  standalone: true,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  @Input() quizzes: Quiz[] = [];
  quizIndex = 0;
  questionIndex = 0;
  selectedAnswer: string | null = null;
  answerSubmitted = false;
  isCorrect: boolean | null = null;
  showErrorMessage = false;
  correctAnswersCount = 0;

  ngOnInit(): void {
    this.loadProgress();
  }

  currentQuizQuestion() {
    return this.quizzes[this.quizIndex].questions[this.questionIndex];
  }

  submitAnswer() {
    if (this.selectedAnswer) {
      this.isCorrect =
        this.selectedAnswer === this.currentQuizQuestion().answer;
      if (this.isCorrect) {
        this.correctAnswersCount++;
      }

      this.answerSubmitted = true;
      this.showErrorMessage = false;
    } else {
      this.showErrorMessage = true;
    }
  }

  nextQuestion() {
    if (
      this.questionIndex <
      this.quizzes[this.quizIndex].questions.length - 1
    ) {
      this.questionIndex++;
    } else if (this.quizIndex < this.quizzes.length - 1) {
      this.quizIndex++;
      this.questionIndex = 0;
    }
    this.resetQuestionState();
    this.saveProgress();
  }

  selectAnswer(answer: string) {
    if (!this.answerSubmitted) {
      this.selectedAnswer = answer;
      this.showErrorMessage = false;
    }
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  private resetQuestionState() {
    this.answerSubmitted = false;
    this.selectedAnswer = null;
    this.isCorrect = null;
    this.showErrorMessage = false;
  }

  private saveProgress(): void {
    const progress = {
      correctAnswersCount: this.correctAnswersCount,
      quizIndex: this.quizIndex,
      questionIndex: this.questionIndex,
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
  }

  private loadProgress(): void {
    const savedProgress = localStorage.getItem('quizProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.correctAnswersCount = progress.correctAnswersCount || 0;
      this.quizIndex = progress.quizIndex || 0;
      this.questionIndex = progress.questionIndex || 0;
    }
  }
}
