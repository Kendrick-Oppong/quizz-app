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

  ngOnInit() {
    this.loadQuizProgress();
  }

  currentQuizQuestion() {
    return this.quizzes[this.quizIndex].questions[this.questionIndex];
  }

  submitAnswer() {
    if (this.selectedAnswer) {
      this.answerSubmitted = true;
      this.isCorrect =
        this.selectedAnswer === this.currentQuizQuestion().answer;
      this.showErrorMessage = false;
      this.saveQuizProgress();
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
    this.saveQuizProgress();
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

  private saveQuizProgress() {
    const quizState = {
      quizIndex: this.quizIndex,
      questionIndex: this.questionIndex,
      selectedAnswer: this.selectedAnswer,
      answerSubmitted: this.answerSubmitted,
    };
    localStorage.setItem('quizState', JSON.stringify(quizState));
  }

  private loadQuizProgress() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const quizState = JSON.parse(savedState);
      this.quizIndex = quizState.quizIndex || 0;
      this.questionIndex = quizState.questionIndex || 0;
      this.selectedAnswer = quizState.selectedAnswer || null;
      this.answerSubmitted = quizState.answerSubmitted || false;
    }
  }
}
