import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class CommentProviderService {

  constructor(private http: HttpClient, private socket: Socket) { }

  public fetchComments(): Observable<any> {
    return this.http.get("/api/getComments");
    // this.socket.emit("getComments", {});
  }

  public onCommentEmitted(): Observable<any>{
    return this.socket.fromEvent("commentAdded");
  }
  public createComment(commentRequest: any): Observable<any>{
    this.socket.emit("addComment", commentRequest);
    return this.socket.fromEvent("addComment");
  }

  public fetchComment(cid: number): Observable<any> {
    return this.http.get(`/api/getComment/${cid}`)
  }
  public deleteComments(): Observable<any>{
    return this.http.delete("/api/deleteComments");
  }
}
