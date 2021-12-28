import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserComment } from '../model/user-comment';

@Injectable()
export class CommentProviderService {

  constructor(private http: HttpClient) { }

  public fetchComments(): Observable<any> {
    return this.http.get("/api/getComments");
  }

  public createComment(commentRequest: any): Observable<any>{
    return this.http.post("/api/createComment", commentRequest).pipe(map((res: any) => {
      return res;
    }, catchError((err) => {
      return of({ success: false, resource: err });
    })));
  }

  public fetchComment(cid: number): Observable<any> {
    return this.http.get(`/api/getComment/${cid}`)
  }
  public deleteComments(): Observable<any>{
    return this.http.delete("/api/deleteComments");
  }
}
