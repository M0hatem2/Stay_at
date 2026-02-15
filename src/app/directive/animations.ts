import { animate, style, transition, trigger } from '@angular/animations';

export const fadeUp = trigger('fadeUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);
