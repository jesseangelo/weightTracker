import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISet } from 'app/shared/model/set.model';

@Component({
  selector: 'jhi-set-detail',
  templateUrl: './set-detail.component.html'
})
export class SetDetailComponent implements OnInit {
  set: ISet;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ set }) => {
      this.set = set;
    });
  }

  previousState() {
    window.history.back();
  }
}
