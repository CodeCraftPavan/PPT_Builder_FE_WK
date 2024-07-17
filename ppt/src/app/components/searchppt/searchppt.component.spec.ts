import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpptComponent } from './searchppt.component';

describe('SearchpptComponent', () => {
  let component: SearchpptComponent;
  let fixture: ComponentFixture<SearchpptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchpptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchpptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
