import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISet } from 'app/shared/model/set.model';
import { SetService } from './set.service';

@Component({
  selector: 'jhi-set-delete-dialog',
  templateUrl: './set-delete-dialog.component.html'
})
export class SetDeleteDialogComponent {
  set: ISet;

  constructor(protected setService: SetService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.setService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'setListModification',
        content: 'Deleted an set'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-set-delete-popup',
  template: ''
})
export class SetDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ set }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SetDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.set = set;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/set', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/set', { outlets: { popup: null } }]);
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
