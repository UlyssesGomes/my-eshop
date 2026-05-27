import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { PerfilMenu } from '../../models/perfil-menu/perfil-menu';
import { RoleNamePipe } from '../../pipes/role-name/role-name-pipe';

@Component({
  selector: 'app-profile-view',
  imports: [CommonModule, RoleNamePipe],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss'
})
export class ProfileView {
  @Input()
  perfilInfo?: PerfilMenu;
}
