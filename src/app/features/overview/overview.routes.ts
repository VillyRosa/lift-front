import { Routes } from "@angular/router";
import { Overview } from "./overview";

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: Overview },
];

export default routes;
