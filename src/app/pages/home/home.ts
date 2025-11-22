import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

import { NavbarMenuItem } from '../../shared/models/menu-item/navbar-menu-item';
import { Navbar } from '../../core/components/navbar/navbar';
import { PerfilMenu } from '../../shared/models/perfil-menu/perfil-menu';
import { Footer } from '../../core/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, ContextMenuModule, Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  shopCartAmount = 0;

  menuButtons: NavbarMenuItem[] = [
    {
      alternativeIcon: 'resources/images/icon/material/outline/icon-shirt-24.svg',
      title: 'Camisetas',
      path: '/products'
    },
    {
      alternativeIcon: 'resources/images/icon/material/outline/icon-mug-24.svg',
      title: 'Canecas',
      path: '/canecas'
    },
    {
      alternativeIcon: 'resources/images/icon/material/outline/icon-botton-24.svg',
      title: 'Bottons',
      path: '/bottons'
    },
    {
      alternativeIcon: 'resources/images/icon/material/outline/icon-palette-24.svg',
      title: 'Personalize',
      path: '/personalize'
    },
  ];

  profileMenuItems: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => {
        console.warn('not implemented yet.');
      }
    },
    {
      label: 'Configuração',
      icon: 'pi pi-cog',
      command: () => {
        console.warn('not implemented yet.');
      }
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => {
        console.warn('not implemented yet.');
      }
    }
  ];

  perfilInfo: PerfilMenu = {
    name: 'Ulysses',
    lastName: 'Gomes',
    role: 'Owner',
    image: 'data:image/png;base64,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'
  }
}
