import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, filter, Observable, Subscription } from 'rxjs';

import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetAlgorithmParameters, GetAlgorithms, GetUserDatasets, SelectAlgorithm, SetAlgorithmParameterValue } from './algorithm.actions';
import { AlgorithmModel, AlgorithmParametersModel, DatasetModel } from './algorithm.model';
import { AlgorithmState } from './algorithm.state';

@Component({
  selector: 'app-model-config',
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './algorithm.html',
  styleUrl: './algorithm.css',
})
export class AlgorithmComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private sub = new Subscription();

  algorithms$: Observable<AlgorithmModel[]> = this.store.select(
    state => state.algorithm.algorithms
  );

  parameters$: Observable<AlgorithmParametersModel | null> = this.store.select(
    state => state.algorithm.parameters
  );

  datasets$: Observable<DatasetModel[]> = this.store.select(AlgorithmState.datasets);

  paramsForm: FormGroup | null = null;

  currentParams: AlgorithmParametersModel | null = null;

  ngOnInit() {
    this.store.dispatch(new GetAlgorithms());
    this.store.dispatch(new GetUserDatasets());

    this.sub.add(
      this.parameters$.subscribe(params => {
        this.currentParams = params;
        if (params) {
          this.buildForm(params); 
        } else {
          this.paramsForm = null;
        }
      })
    );
  }

  private buildForm(params: AlgorithmParametersModel): void {
    const numericControls: Record<string, any> = {};
    const stringControls: Record<string, any> = {};

    for (const p of params.numeric_parameters) {
      numericControls[p.name] = [
        p.default_value,
        [
          Validators.required,
          Validators.max(p.max_value)
        ]
      ];
    }

    for (const p of params.string_parameters) { 
      stringControls[p.name] = [p.default_value, Validators.required];
    }

    this.paramsForm = this.fb.group({
      numeric: this.fb.group(numericControls),
      string: this.fb.group(stringControls)
    });

    this.sub.add(
      this.paramsForm.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        filter(() => this.paramsForm?.valid ?? false),
      ).subscribe(values => {
        this.store.dispatch(new SetAlgorithmParameterValue(values));
      })
    );
  }

  onAlgorithmSelected(algorithm: AlgorithmModel) {
    this.store.dispatch(new SelectAlgorithm(algorithm));
    this.store.dispatch(new GetAlgorithmParameters(algorithm.algorithm_id));
  }

  getNumericControl(name: string) {
    return this.paramsForm?.get('numeric')?.get(name);
  }
  
  getStringControl(name: string) {
    return this.paramsForm?.get('string')?.get(name);
  }

  onRun(): void {
    if (this.paramsForm?.valid) {
      console.log('Runing with: ', this.paramsForm.value);
    }
  }

  ngOnDestroy() { 
    this.sub.unsubscribe();
  }
}
