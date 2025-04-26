import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBloodRequestComponent } from './current-blood-request.component';

describe('CurrentBloodRequestComponent', () => {
  let component: CurrentBloodRequestComponent;
  let fixture: ComponentFixture<CurrentBloodRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentBloodRequestComponent]
    });
    fixture = TestBed.createComponent(CurrentBloodRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
