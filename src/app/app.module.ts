import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFirestore } from 'firebase/firestore';
import { AdminComponent } from './admin/admin.component';
import { InvitatiComponent } from './invitati/invitati.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    InvitatiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
