import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitpptComponent } from './splitppt.component';

describe('SplitpptComponent', () => {
  let component: SplitpptComponent;
  let fixture: ComponentFixture<SplitpptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitpptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitpptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
