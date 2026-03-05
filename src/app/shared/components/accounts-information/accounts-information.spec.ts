import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AccountsInformation } from './accounts-information';

describe('AccountsInformation', () => {
  let component: AccountsInformation;
  let fixture: ComponentFixture<AccountsInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsInformation, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: {
              subscribe: (fn: any) => fn(convertToParamMap({})),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
