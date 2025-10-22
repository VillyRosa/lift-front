import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SidebarLink } from "./components/sidebar-link/sidebar-link";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, SidebarLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

}
