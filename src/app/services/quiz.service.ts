import { Injectable } from '@angular/core';
import * as quizData from '../../assets/data/data.json';
import { Quiz } from '../interfaces/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizzes: Quiz[] = quizData.quizzes;

  getQuizzes() {
    return this.quizzes;
  }
}
