import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Academy } from './academy';

describe('Academy', () => {
  let component: Academy;
  let fixture: ComponentFixture<Academy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Academy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Academy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
