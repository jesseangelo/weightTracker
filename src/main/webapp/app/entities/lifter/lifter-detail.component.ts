import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILifter } from 'app/shared/model/lifter.model';

@Component({
  selector: 'jhi-lifter-detail',
  templateUrl: './lifter-detail.component.html'
})
export class LifterDetailComponent implements OnInit {
  lifter: ILifter;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ lifter }) => {
      this.lifter = lifter;
    });
  }

  previousState() {
    window.history.back();
  }
}
