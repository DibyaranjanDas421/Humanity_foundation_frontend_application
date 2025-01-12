import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorSearchComponentComponent } from './donor-search-component.component';

describe('DonorSearchComponentComponent', () => {
  let component: DonorSearchComponentComponent;
  let fixture: ComponentFixture<DonorSearchComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonorSearchComponentComponent]
    });
    fixture = TestBed.createComponent(DonorSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
