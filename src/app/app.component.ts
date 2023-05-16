import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "matrimonio-gian";
  db; 
  constructor(public store?: AngularFirestore, private router?:Router) {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
    this.router?.navigateByUrl('/invitati');
  }

} 

export interface Partecipante {
  nome: string;
  cognome: string;
  isPresent: string;
}
