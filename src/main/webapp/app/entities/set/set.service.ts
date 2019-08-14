import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISet } from 'app/shared/model/set.model';

type EntityResponseType = HttpResponse<ISet>;
type EntityArrayResponseType = HttpResponse<ISet[]>;

@Injectable({ providedIn: 'root' })
export class SetService {
  public resourceUrl = SERVER_API_URL + 'api/sets';

  constructor(protected http: HttpClient) {}

  create(set: ISet): Observable<EntityResponseType> {
    return this.http.post<ISet>(this.resourceUrl, set, { observe: 'response' });
  }

  update(set: ISet): Observable<EntityResponseType> {
    return this.http.put<ISet>(this.resourceUrl, set, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<ISet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
