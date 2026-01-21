import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireUs } from './hire-us';

describe('HireUs', () => {
  let component: HireUs;
  let fixture: ComponentFixture<HireUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireUs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireUs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
