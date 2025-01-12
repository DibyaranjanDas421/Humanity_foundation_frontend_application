import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciverRequestComponent } from './reciver-request.component';

describe('ReciverRequestComponent', () => {
  let component: ReciverRequestComponent;
  let fixture: ComponentFixture<ReciverRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReciverRequestComponent]
    });
    fixture = TestBed.createComponent(ReciverRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
