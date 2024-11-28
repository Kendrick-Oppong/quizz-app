import { Component, Input } from '@angular/core';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-questions',
  standalone: true,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  @Input() quizzes: Quiz[] = [];
  quizIndex = 0;
  questionIndex = 0;
  selectedAnswer: string | null = null;
  answerSubmitted = false;
  isCorrect: boolean | null = null;
  showErrorMessage = false;

  currentQuizQuestion() {
    return this.quizzes[this.quizIndex].questions[this.questionIndex];
  }

  submitAnswer() {
    if (this.selectedAnswer) {
      this.answerSubmitted = true;
      this.isCorrect =
        this.selectedAnswer === this.currentQuizQuestion().answer;
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
}
