import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-link',
  imports: [RouterLink],
  templateUrl: './sidebar-link.html',
  styleUrl: './sidebar-link.css'
})
export class SidebarLink {

  @Input() label: string = '';
  @Input() routerLink: string = '';
  @Input() icon: string = '';

}
