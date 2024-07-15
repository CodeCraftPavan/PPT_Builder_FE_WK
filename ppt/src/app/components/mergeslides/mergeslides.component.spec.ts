import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeslidesComponent } from './mergeslides.component';

describe('MergeslidesComponent', () => {
  let component: MergeslidesComponent;
  let fixture: ComponentFixture<MergeslidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeslidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeslidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
