import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { NavbarMenuItem } from '../../models/menu-item/navbar-menu-item';
import { PerfilMenu } from '../../models/perfil-menu/perfil-menu';
import { ProfileView } from '../profile-view/profile-view';

@Component({
  selector: 'app-simple-sidebar',
  imports: [CommonModule, ButtonModule, DividerModule, ProfileView],
  templateUrl: './simple-sidebar.html',
  styleUrl: './simple-sidebar.scss'
})
export class SimpleSidebar {

  @Input()
  menuButtons?: NavbarMenuItem[];  

  @Input()
  isOpen = false;

  @Input()
  perfilInfo?: PerfilMenu;

  @Output()
  isOpenChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  closeSidebar() {
    this.isOpenChange.emit(false);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
