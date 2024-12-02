import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Quiz } from '../../interfaces/quiz';

@Component({
  selector: 'app-questions',
  standalone: true,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  encapsulation: ViewEncapsulation.None,
})
  
export class QuestionsComponent implements OnInit {
  @Input() quizzes: Quiz[] = [];
  @Output() quizFinished = new EventEmitter<number>();

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

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
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

      this.saveAnswer();
    } else {
      this.showErrorMessage = true;
    }
  }

  selectAnswer(answer: string) {
    if (!this.answerSubmitted) {
      this.selectedAnswer = answer;
      this.showErrorMessage = false;
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
    } else {
      this.quizFinished.emit(this.correctAnswersCount);
    }

    this.resetQuestionState();
    this.saveProgress();
  }

  isLastQuestion(): boolean {
    return (
      this.quizIndex === this.quizzes.length - 1 &&
      this.questionIndex === this.quizzes[this.quizIndex].questions.length - 1
    );
  }

  private resetQuestionState() {
    this.answerSubmitted = false;
    this.selectedAnswer = null;
    this.isCorrect = null;
    this.showErrorMessage = false;
    this.loadAnswer();
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

      this.loadAnswer();
    }
  }

  private saveAnswer(): void {
    const answerData = {
      selectedAnswer: this.selectedAnswer,
      answerSubmitted: this.answerSubmitted,
      isCorrect: this.isCorrect,
    };
    localStorage.setItem(
      `quiz-${this.quizIndex}-question-${this.questionIndex}`,
      JSON.stringify(answerData)
    );
  }

  private loadAnswer(): void {
    const savedAnswer = localStorage.getItem(
      `quiz-${this.quizIndex}-question-${this.questionIndex}`
    );
    if (savedAnswer) {
      const answerData = JSON.parse(savedAnswer);
      this.selectedAnswer = answerData.selectedAnswer;
      this.answerSubmitted = answerData.answerSubmitted;
      this.isCorrect = answerData.isCorrect;
    }
  }
}
