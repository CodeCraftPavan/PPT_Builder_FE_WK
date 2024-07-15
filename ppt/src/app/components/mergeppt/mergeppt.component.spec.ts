import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergepptComponent } from './mergeppt.component';

describe('MergepptComponent', () => {
  let component: MergepptComponent;
  let fixture: ComponentFixture<MergepptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergepptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergepptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
