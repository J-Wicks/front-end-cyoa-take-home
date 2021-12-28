import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { CommentProviderService } from './services/comment-provider.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentBodyComponent } from './components/comment-body/comment-body.component';
import { SortPipe } from './pipes/sort.pipe';
import { NewCommentBannerComponent } from './new-comment-banner/new-comment-banner.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
	url: environment.socketUrl,
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,
    CommentCardComponent,
    CommentListComponent,
    CommentFormComponent,
    CommentBodyComponent,
    SortPipe,
    NewCommentBannerComponent,
    DateFormatPipe
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
		SocketIoModule.forRoot(config), 
    HttpClientModule
  ],
  providers: [CommentProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
