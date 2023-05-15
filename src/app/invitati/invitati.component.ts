import { Component, OnInit } from "@angular/core";
import { AppComponent, Partecipante } from "../app.component";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "invitati",
  templateUrl: "./invitati.component.html",
  styleUrls: ["./invitati.component.scss"],
})
export class InvitatiComponent {
  form: FormGroup;
  constructor(public store: AngularFirestore) {
    this.form = new FormGroup({
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      choice: new FormControl("", Validators.required),
    });
  }
  onConfirm() {
    if (this.form.valid) {
      this.store?.collection<Partecipante>("partecipanti")
        .add({
          nome: this.form.get("firstname")?.value,
          cognome: this.form.get('lastname')?.value,
          isPresent: this.form.get('choice')?.value
        })
        .then(res => {
          alert('Scelta salvata con successo');
          this.form.reset();
        }).catch(error => {
          alert('Riprova!');
        });
    }
  }
}
