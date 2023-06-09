import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { InvitatiComponent } from "./invitati/invitati.component";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "admin",
        component: AdminComponent
      },
      {
        path: "invitati",
        component: InvitatiComponent
      },
      { path: '**', component: AppComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
