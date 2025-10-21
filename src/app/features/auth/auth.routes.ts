import { Routes } from "@angular/router";
import { Login } from "./login/login";
import { Register } from "./register/register";

const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  }
];

export default routes;
