import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iPaginatedResponse } from '@shared/interfaces/paginate-response';
import { Observable } from 'rxjs';
import { iGoal } from '../interface/goal';
import { iNewGoal } from '../interface/new-goal';
import { iPageableRequest } from '@shared/interfaces/pageable-request';

@Injectable({
  providedIn: 'root'
})
export class Goals {
  
  private http = inject(HttpClient);

  public findAll(pageable: iPageableRequest): Observable<iPaginatedResponse<iGoal>> {
    let params = new HttpParams();

    if (pageable.page != null) params = params.set('page', pageable.page.toString());
    if (pageable.size != null) params = params.set('size', pageable.size.toString());
    if (pageable.sort) params = params.set('sort', pageable.sort);

    if (pageable.filters) {
      Object.keys(pageable.filters).forEach(key => {
        if (pageable.filters![key] != null) {
          params = params.set(key, pageable.filters![key].toString());
        }
      });
    }

    return this.http.get<iPaginatedResponse<iGoal>>('/goals', { params });
  }

  public findById(id: string): Observable<iGoal> {
    return this.http.get<iGoal>("/goals/" + id);
  }

  public create(data: iNewGoal): Observable<iGoal> {
    return this.http.post<iGoal>("/goals", data);
  }

  public updateById(id: number, data: iNewGoal): Observable<iGoal> {
    return this.http.put<iGoal>("/goals/" + id, data);
  }

  public deleteById(id: number): Observable<iPaginatedResponse<iGoal>> {
    return this.http.delete<iPaginatedResponse<iGoal>>("/goals/" + id);
  }

}
