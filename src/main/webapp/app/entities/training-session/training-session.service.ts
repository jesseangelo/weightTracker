import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITrainingSession } from 'app/shared/model/training-session.model';

type EntityResponseType = HttpResponse<ITrainingSession>;
type EntityArrayResponseType = HttpResponse<ITrainingSession[]>;

@Injectable({ providedIn: 'root' })
export class TrainingSessionService {
  public resourceUrl = SERVER_API_URL + 'api/training-sessions';

  constructor(protected http: HttpClient) {}

  create(trainingSession: ITrainingSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trainingSession);
    return this.http
      .post<ITrainingSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trainingSession: ITrainingSession): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trainingSession);
    return this.http
      .put<ITrainingSession>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ITrainingSession>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrainingSession[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(trainingSession: ITrainingSession): ITrainingSession {
    const copy: ITrainingSession = Object.assign({}, trainingSession, {
      date: trainingSession.date != null && trainingSession.date.isValid() ? trainingSession.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((trainingSession: ITrainingSession) => {
        trainingSession.date = trainingSession.date != null ? moment(trainingSession.date) : null;
      });
    }
    return res;
  }
}
