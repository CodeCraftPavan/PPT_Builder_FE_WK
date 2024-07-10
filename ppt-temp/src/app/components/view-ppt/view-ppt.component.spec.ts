import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPptComponent } from './view-ppt.component';

describe('ViewPptComponent', () => {
  let component: ViewPptComponent;
  let fixture: ComponentFixture<ViewPptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
