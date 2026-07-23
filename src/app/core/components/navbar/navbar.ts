import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

import { NavbarMenuItem } from '../../../shared/models/menu-item/navbar-menu-item';
import { PerfilMenu } from '../../../shared/models/perfil-menu/perfil-menu';
import { SimpleSidebar } from '../../../shared/components/simple-sidebar/simple-sidebar';
import { ProfileView } from '../../../shared/components/profile-view/profile-view';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MenuModule, BadgeModule, ButtonModule, OverlayBadgeModule, SimpleSidebar, ProfileView],
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
  shopCartAmount!: number;

  @Input()
  permissions?: string [];

  isOpen = false;

  constructor(private router: Router) {}

  openPerfilMenu(contextMenu: any, event: Event) {
    if(this.perfilInfo != null) {
      contextMenu.toggle(event);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  openSidebar() {
    this.isOpen = !this.isOpen;
  }

  verifyPermissions(permission: string [] | undefined) {
    if(permission === undefined || permission === null || this.permissions == undefined || this.permissions === null)
      return true;
    const showElement = permission.some(p => this.permissions?.includes(p));
    return showElement;
  }
}
