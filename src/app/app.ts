import { Component, OnInit, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';
import { filter } from 'rxjs/operators';
import { NotLoggedInComponent } from "./shared/components/not-logged-in/not-logged-in";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, NotLoggedInComponent],
})
export class App implements OnInit {
  protected readonly title = signal('Stay_At');

  constructor(private router: Router) {}

  ngOnInit() {
    // التكوين الأولي للمكتبة
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      // إضافة مرونة في الحساب لضمان عدم بقاء العناصر بيضاء
      offset: 100,
    });

    // Refresh AOS on route change
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      // نستخدم setTimeout لإعطاء Angular وقتاً كافياً لبناء الـ DOM الجديد
      setTimeout(() => {
        AOS.refreshHard(); // refreshHard تقوم بإعادة فحص الـ DOM من الصفر
      }, 200);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // ترجع الصفحة لأعلى
      }
    });
  }
}
