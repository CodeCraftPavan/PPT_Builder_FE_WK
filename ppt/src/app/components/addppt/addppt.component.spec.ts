import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpptComponent } from './addppt.component';

describe('AddpptComponent', () => {
  let component: AddpptComponent;
  let fixture: ComponentFixture<AddpptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
