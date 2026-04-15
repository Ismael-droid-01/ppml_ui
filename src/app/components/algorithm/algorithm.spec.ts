import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmComponent } from './algorithm';

describe('AlgorithmComponent', () => {
  let component: AlgorithmComponent;
  let fixture: ComponentFixture<AlgorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgorithmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
