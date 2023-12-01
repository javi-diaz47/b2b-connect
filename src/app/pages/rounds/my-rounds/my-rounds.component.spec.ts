import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoundsComponent } from './my-rounds.component';

describe('MyRoundsComponent', () => {
  let component: MyRoundsComponent;
  let fixture: ComponentFixture<MyRoundsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRoundsComponent]
    });
    fixture = TestBed.createComponent(MyRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
