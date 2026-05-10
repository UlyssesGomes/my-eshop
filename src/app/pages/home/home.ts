import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

import { HeaderHighlights } from '../../shared/components/header-highlights/header-highlights';
import { NavbarMenuItem } from '../../shared/models/menu-item/navbar-menu-item';
import { Navbar } from '../../core/components/navbar/navbar';
import { PerfilMenu } from '../../shared/models/perfil-menu/perfil-menu';
import { Footer } from '../../core/components/footer/footer';
import { LocalStoageKey } from '../../shared/enums/localstorage-key';
import { TokenUtils } from '../../shared/utils/token-utils';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, ContextMenuModule, HeaderHighlights, Navbar, Footer],
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
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['/perfil']);
      }
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-shopping-bag',
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
        TokenUtils.clearUserAndToken();
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
    const loggedUser = TokenUtils.getValidLoggedUser();
    if (loggedUser != null) {
      this.perfilInfo = new PerfilMenu();
      const nameSplited: any = loggedUser.name.split(' ');
      this.perfilInfo!.name = nameSplited[0];
      this.perfilInfo!.lastName = nameSplited != null && nameSplited.length > 1 ? nameSplited[nameSplited.length - 1] : '';
      this.perfilInfo!.type = loggedUser.type.toString();
    } else {
      this.perfilInfo = undefined;
    }
  }
}
