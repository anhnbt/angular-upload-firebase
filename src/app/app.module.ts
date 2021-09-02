import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule, BUCKET} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: BUCKET, useValue: environment.firebase.storageBucket}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
