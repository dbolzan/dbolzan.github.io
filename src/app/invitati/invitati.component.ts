import { Component, OnInit } from "@angular/core";
import { AppComponent, Partecipante } from "../app.component";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { password } from "config";
import { Router } from "@angular/router";
import { mergeMap } from "rxjs/operators";

@Component({
  selector: "invitati",
  templateUrl: "./invitati.component.html",
  styleUrls: ["./invitati.component.scss"],
})
export class InvitatiComponent {
  form: FormGroup;
  formPass: FormGroup;
  openModal = false;
  constructor(public store: AngularFirestore, private router: Router) {
    this.form = new FormGroup({
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      choice: new FormControl("", Validators.required),
    });
    this.formPass = new FormGroup({
      password: new FormControl("", Validators.required),
    });
  }
  onConfirm() {
    const query = this.store.collection(
      "partecipanti",
      (ref) =>
        ref.where("nome", "==", (this.form.get("firstname")?.value as String).toUpperCase()) &&
        ref.where("cognome", "==", (this.form.get("lastname")?.value  as String).toUpperCase())
    );
    query.get().subscribe((querySnapshot) => {
      if (querySnapshot.empty) {
        this.store
          ?.collection<Partecipante>("partecipanti")
          .add({
            nome: (this.form.get("firstname")?.value as String).toUpperCase(),
            cognome: (this.form.get("lastname")?.value as String).toUpperCase(),
            isPresent: (this.form.get("choice")?.value as String).toUpperCase(),
          })
          .then((res) => {
            alert("Scelta salvata con successo");
            this.form.reset();
          })
          .catch((error) => {
            alert("Riprova!");
          });
      } else {
        querySnapshot.forEach((documentSnapshot) => {
          this.store
            ?.doc("partecipanti/" + documentSnapshot.id)
            .update({ isPresent: this.form.get("choice")?.value })
            .then((res) => {
              alert(
                "E' già presente una preferenza relativa a questo nominativo. La scelta è stata aggiornata"
              );
            })
            .catch((error) => {
              alert("Qualcosa è andato storto");
            });
        });
      }
    });
    // if (!this.form.valid) {

    // }
  }

  goToAdmin() {
    if (this.formPass.get("password")?.value === password) {
      this.router?.navigateByUrl("/admin");
    } else {
      alert("Password errata");
    }
  }
}
