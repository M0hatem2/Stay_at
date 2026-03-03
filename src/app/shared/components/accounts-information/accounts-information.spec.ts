import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsInformation } from './accounts-information';

describe('AccountsInformation', () => {
  let component: AccountsInformation;
  let fixture: ComponentFixture<AccountsInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
