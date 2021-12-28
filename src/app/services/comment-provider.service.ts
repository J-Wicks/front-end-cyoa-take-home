import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class CommentProviderService {

  constructor(private http: HttpClient, private socket: Socket) { }

  public fetchComments(): void {
    this.socket.emit("message", "test");
    // return this.http.get("/api/getComments");
  }

  public onFetchComments(): Observable<any>{
    return this.socket.fromEvent("getComments");
  }
  public createComment(commentRequest: any): Observable<any>{
    this.socket.emit("message", commentRequest);
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
