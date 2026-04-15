import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsyncPipe, CommonModule } from '@angular/common';

import { GetAlgorithms, SelectAlgorithm } from './algorithm.actions';
import { AlgorithmModel } from './algorithm.model';

@Component({
  selector: 'app-model-config',
  imports: [
    CommonModule,
    AsyncPipe,
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

  algorithms$: Observable<AlgorithmModel[]> = this.store.select(
    state => state.algorithm.algorithms
  );

  selectedAlgorithm: AlgorithmModel | null = null;

  ngOnInit() {
    this.store.dispatch(new GetAlgorithms());
  }

  onAlgorithmSelected(algorithm: AlgorithmModel) {
    this.selectedAlgorithm = algorithm;
    this.store.dispatch(new SelectAlgorithm(algorithm));
  }
}
