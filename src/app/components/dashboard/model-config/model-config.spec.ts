import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfig } from './model-config';

describe('ModelConfig', () => {
  let component: ModelConfig;
  let fixture: ComponentFixture<ModelConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
