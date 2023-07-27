import { ResultService } from './../services/result.service';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, takeUntil } from 'rxjs';
@Component({
  selector: 'org-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {


  title = 'آزمون شدت اضطراب برنز';
  description = "راهنمایی: میزان شدت اضطراب هفته گذشته خود را مشخص کنید."
  questions = [
    // Your 30 questions here...
    'اضطراب، نگرانی، دستپاچگی، ترس',
    'احساس عجیب، غیرواقعی و یا مبهم بودن اشیا',
    'احساس جدا بودن از تمام یا بخشی از جسم خود',
    'هراس ناگهانی و غیرمنتظره',
    'احساس سرنوشت شوم',
    'احساس گرفتکی، فشار روانی',

    'دشواری در تمرکز',
    'پرش ذهنی از موضوعی به موضوع دیگر',
    'خیالات هراس انگیز',
    'ترس از دست دادن کنترل خود',
    'ترس از دیوانگی و اختلال مشاعر',
    'ترس از بیهوش شدن',
    'ترس از بیماری جسمی حمله قلبی یا مردن',
    'ترس از مصحکه شدن',
    'ترس از تنها ماندن و منزوی شدن',
    'ترس از انتقاد و تایید نشدن',
    'پیش‌بینی حوادث وحشتناک',


    'تپش قلب',
    'درد و فشار و گرفتگی در ناحیه سینه',
    'کرختی سر انگشتان پا یا دست',
    'بی‌آرامی و دلهره',
    'یبوست، اسهال',
    'بی‌قراری، از جا پریدن',
    'گرفتگی عضلات',
    'عرق کردن بدون تب',
    'احساس ورم در ناحیه گلو',
    'لرزش و تکان بدن',
    'لرزش در ناحیه ساق پا',
    'احساس سرگیجه، حواس پرتی یا از دست دادن کنترل',
    'احساس خفگی، دشواری در تنفس',
  ];
  currentIndex = 0;

  answers: string[] = Array(this.questions.length).fill('');
  // Variable to control notification visibility
  showNotification = false;

  submitForm() {
    // Process the answers and display the result
    if (this.answers.some(answer => answer === '')) {
      this.showNotification = true;
      // Hide the notification after 3 seconds (adjust as needed)
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    } else {
      // Process the answers and display the result
      const sum = this.answers.reduce((accumulator, currentValue) => {
        // تبدیل مقادیر به عدد اگر لازم باشد (البته اگر مطمئن هستید مقادیر همگی اعداد هستند، این بخش را می‌توانید حذف کنید)
        const num = parseInt(currentValue);
        // اگر عملکرد parseInt نتیجه‌ای معتبر برنگرداند، مقدار 0 را به عنوان مقدار پیش‌فرض استفاده می‌کنیم
        accumulator += isNaN(num) ? 0 : num;
        return accumulator;
      }, 0);

      this.resultService.setSumTest(sum);
      this.router.navigate(['/result']);
    }
  }

  private scrollSubject = new Subject<number>();
  private isScrolling = false;

  constructor(private resultService:ResultService,private router: Router) {
    fromEvent(window, 'wheel')
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.scrollSubject))
      .subscribe((event: any) => {
        if (!this.isScrolling) {
          const delta = event.deltaY;
          if (delta > 0) {
            this.scrollToNextQuestion();
          } else {
            this.scrollToPreviousQuestion();
          }
        }
      });
  }


  gotoQuestion(i : number){

    const questionElement = document.getElementById(`question-${i}`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth' });
      this.currentIndex = i;
    }
  }
  scrollToNextQuestion() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      // const currentIndex = this.questions.findIndex((_, index) => this.answers[index] === '');
      // if (currentIndex >= 0 && currentIndex < this.questions.length - 1) {
        if (this.currentIndex>=this.questions.length) {this.currentIndex = this.questions.length;} else{this.isScrolling = false;}
        if (this.currentIndex<=0) {this.currentIndex = 1} else{this.isScrolling = false;}
        console.log(this.currentIndex)
        const nextQuestionElement = document.getElementById(`question-${this.currentIndex++}`);
        if (nextQuestionElement) {
          nextQuestionElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            this.isScrolling = false;
          }, 500);
        }
      // } else {
      //   this.isScrolling = false;
      // }
    }
  }

  scrollToPreviousQuestion() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      // const currentIndex = this.questions.findIndex((_, index) => this.answers[index] === '');
      // if (currentIndex > 0) {
        if (this.currentIndex<=0) {this.currentIndex = 0;}else{this.isScrolling = false;}
        if (this.currentIndex>=this.questions.length) {this.currentIndex = this.questions.length-1;} else{this.isScrolling = false;}
        console.log(this.currentIndex)
        const previousQuestionElement = document.getElementById(`question-${this.currentIndex--}`);
        if (previousQuestionElement) {
          previousQuestionElement.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            this.isScrolling = false;
          }, 500);
        }
      // } else {
      //   this.isScrolling = false;
      // }
    }
  }


}
