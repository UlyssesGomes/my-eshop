import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

import { NavbarMenuItem } from '../../shared/models/menu-item/navbar-menu-item';
import { Navbar } from '../../core/components/navbar/navbar';
import { PerfilMenu } from '../../shared/models/perfil-menu/perfil-menu';
import { Footer } from '../../core/components/footer/footer';
import { LocalStoageKey } from '../../shared/enums/localstorage-key';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, ContextMenuModule, Navbar, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  shopCartAmount = 0;

  menuButtons: NavbarMenuItem[] = [
    {
      alternativeIcon: 'resources/images/icon/material/outline/icon-shirt-24.svg',
      title: 'Camisetas',
      path: '/produtos'
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
      icon: 'pi-user',
      command: () => {
        this.router.navigate(['/perfil']);
      }
    },
    {
      label: 'Pedidos',
      icon: 'pi-shopping-bag',
      command: () => {
        console.warn('not implemented yet.');
      }
    },
    {
      label: 'Configuração',
      icon: 'pi-cog',
      command: () => {
        console.warn('not implemented yet.');
      }
    },
    {
      label: 'Sair',
      icon: 'pi-sign-out',
      command: () => {
        localStorage.removeItem(LocalStoageKey.LOGGED_USER);
        this.router.navigate(['/login']);
      }
    }
  ];

  perfilInfo?: PerfilMenu;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.extractLoginUserData();
  }

  private extractLoginUserData() {
    const loggedUser = localStorage.getItem(LocalStoageKey.LOGGED_USER);
    if (loggedUser != null) {
      this.perfilInfo = JSON.parse(loggedUser);
      const nameSplited: any = this.perfilInfo?.name?.split(' ');
      this.perfilInfo!.name = nameSplited[0];
      this.perfilInfo!.lastName = nameSplited != null && nameSplited.length > 1 ? nameSplited[nameSplited.length - 1] : '';
    }
  }
}
