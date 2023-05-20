import { Component, OnInit, Renderer2 } from "@angular/core";
import { AppComponent, Partecipante } from "../app.component";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";

@Component({
  selector: "admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent extends AppComponent implements OnInit {
  partecipanti: Partecipante[] = [];
  presenti = 0;
  assenti = 0;
  dubbio = 0;
  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnInit() {
    let doc = document.querySelector(".app-wrapper");
    if (doc) {
      this.renderer.setStyle(doc, "background-image", "none");
    }
    this.partecipanti = [];
    getDocs(collection(this.db, "partecipanti")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.partecipanti.push(doc.data() as Partecipante);
      });
      this.presenti = this.partecipanti.filter(
        (pres) => pres.isPresent == "SI"
      )?.length;
      this.assenti = this.partecipanti.filter(
        (pres) => pres.isPresent == "NO"
      )?.length;
      this.dubbio = this.partecipanti.filter(
        (pres) => pres.isPresent == "FORSE"
      )?.length;
    });
  }
}
