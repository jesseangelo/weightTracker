import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExercise } from 'app/shared/model/exercise.model';
import { ExerciseService } from './exercise.service';

@Component({
  selector: 'jhi-exercise-delete-dialog',
  templateUrl: './exercise-delete-dialog.component.html'
})
export class ExerciseDeleteDialogComponent {
  exercise: IExercise;

  constructor(protected exerciseService: ExerciseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.exerciseService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'exerciseListModification',
        content: 'Deleted an exercise'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-exercise-delete-popup',
  template: ''
})
export class ExerciseDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ exercise }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExerciseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.exercise = exercise;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/exercise', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/exercise', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
