import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "matrimonio-gian";
  db; 
  constructor(public store?: AngularFirestore) {
    const app = initializeApp(environment.firebaseConfig);
    this.db = getFirestore(app);
  }

} 

export interface Partecipante {
  nome: string;
  cognome: string;
  isPresent: string;
}
