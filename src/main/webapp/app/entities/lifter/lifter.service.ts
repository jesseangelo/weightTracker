import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILifter } from 'app/shared/model/lifter.model';

type EntityResponseType = HttpResponse<ILifter>;
type EntityArrayResponseType = HttpResponse<ILifter[]>;

@Injectable({ providedIn: 'root' })
export class LifterService {
  public resourceUrl = SERVER_API_URL + 'api/lifters';

  constructor(protected http: HttpClient) {}

  create(lifter: ILifter): Observable<EntityResponseType> {
    return this.http.post<ILifter>(this.resourceUrl, lifter, { observe: 'response' });
  }

  update(lifter: ILifter): Observable<EntityResponseType> {
    return this.http.put<ILifter>(this.resourceUrl, lifter, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ILifter>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILifter[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
