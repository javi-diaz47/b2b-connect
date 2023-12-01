import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoundsComponent } from './create-rounds.component';

describe('CreateRoundsComponent', () => {
  let component: CreateRoundsComponent;
  let fixture: ComponentFixture<CreateRoundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRoundsComponent]
    });
    fixture = TestBed.createComponent(CreateRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
