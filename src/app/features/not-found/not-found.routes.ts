import { Routes } from "@angular/router";
import { NotFound } from "./not-found";

const routes: Routes = [
  { path: '**', component: NotFound },
];

export default routes;
