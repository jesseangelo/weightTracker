import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILifter } from 'app/shared/model/lifter.model';
import { LifterService } from './lifter.service';

@Component({
  selector: 'jhi-lifter-delete-dialog',
  templateUrl: './lifter-delete-dialog.component.html'
})
export class LifterDeleteDialogComponent {
  lifter: ILifter;

  constructor(protected lifterService: LifterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.lifterService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'lifterListModification',
        content: 'Deleted an lifter'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-lifter-delete-popup',
  template: ''
})
export class LifterDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ lifter }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LifterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.lifter = lifter;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/lifter', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/lifter', { outlets: { popup: null } }]);
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
