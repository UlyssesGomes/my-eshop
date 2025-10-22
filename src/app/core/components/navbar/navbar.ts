import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { NavbarMenuItem } from '../../../shared/models/menu-item/navbar-menu-item';
import { PerfilMenu } from '../../../shared/models/perfil-menu/perfil-menu';
import { SimpleSidebar } from '../../../shared/components/simple-sidebar/simple-sidebar';
import { ProfileView } from '../../../shared/components/profile-view/profile-view';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, Menu, BadgeModule, ButtonModule, OverlayBadgeModule, SimpleSidebar, ProfileView],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  @Input()
  menuButtons?: NavbarMenuItem[];

  @Input()
  profileMenu?: MenuItem[];

  @Input()
  perfilInfo?: PerfilMenu;

  @Input()
  isConnected: boolean = true;

  @Input()
  shopCartAmount!: number;

  isOpen = false;

  constructor(private router: Router) {}

  openPerfilMenu(contextMenu: any, event: Event) {
    if(this.isConnected) {
      contextMenu.toggle(event);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  openSidebar() {
    this.isOpen = !this.isOpen;
  }
}
