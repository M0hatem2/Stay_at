import { Directive, ElementRef, Input, AfterViewInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimate]'
})
export class ScrollAnimateDirective implements AfterViewInit {
  @Input('appScrollAnimate') animationClass: string = 'fade-up';
  @Input() animationDelay: string = '0s';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

 
    const element = this.el.nativeElement;

    const activate = () => {
       this.renderer.addClass(element, this.animationClass);
      this.renderer.setStyle(element, 'animation-delay', this.animationDelay);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activate();
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    // Safety: لو العنصر ظاهر في أعلى الصفحة فور التحميل
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      activate();
      observer.unobserve(element);
    }
  }
}
