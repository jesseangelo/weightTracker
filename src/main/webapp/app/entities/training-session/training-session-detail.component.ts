import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrainingSession } from 'app/shared/model/training-session.model';

@Component({
  selector: 'jhi-training-session-detail',
  templateUrl: './training-session-detail.component.html'
})
export class TrainingSessionDetailComponent implements OnInit {
  trainingSession: ITrainingSession;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ trainingSession }) => {
      this.trainingSession = trainingSession;
    });
  }

  previousState() {
    window.history.back();
  }
}
