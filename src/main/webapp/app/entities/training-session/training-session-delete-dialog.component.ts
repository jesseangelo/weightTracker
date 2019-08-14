import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrainingSession } from 'app/shared/model/training-session.model';
import { TrainingSessionService } from './training-session.service';

@Component({
  selector: 'jhi-training-session-delete-dialog',
  templateUrl: './training-session-delete-dialog.component.html'
})
export class TrainingSessionDeleteDialogComponent {
  trainingSession: ITrainingSession;

  constructor(
    protected trainingSessionService: TrainingSessionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.trainingSessionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'trainingSessionListModification',
        content: 'Deleted an trainingSession'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-training-session-delete-popup',
  template: ''
})
export class TrainingSessionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ trainingSession }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TrainingSessionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.trainingSession = trainingSession;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/training-session', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/training-session', { outlets: { popup: null } }]);
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
