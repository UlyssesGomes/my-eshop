import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

import { AvatarModule } from 'primeng/avatar'
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { LocalStoageKey } from '../../shared/enums/localstorage-key';
import { NavbarMenuItem } from '../../shared/models/menu-item/navbar-menu-item';
import { PerfilMenu } from '../../shared/models/perfil-menu/perfil-menu';
import { ProfileView } from '../../shared/components/profile-view/profile-view';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, RouterOutlet, AvatarModule, BadgeModule, ContentPanel, MenuModule, ProfileView],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit, OnDestroy {

  items: NavbarMenuItem[] | undefined;

  userPerfilView!: PerfilMenu;

  lastUrlPath?: string;

  urlSubscription: any[] = [];

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUserPerfil();

    this.lastUrlPath = this.router.url.split('/').pop();
    this.urlSubscription.push(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.lastUrlPath = event.url.split('/').pop();
      }
    }));

    this.items = [
      {
        title: 'Dados Pessoais',
        icon: 'pi pi-user',
        path: 'dados-pessoais',
      },
      {
        title: 'Senha',
        icon: 'pi pi-key',
        path: 'senha',
      },
      {
        title: 'Endereços',
        icon: 'pi pi-home',
        path: 'enderecos',
      }
    ];
  }

  ngOnDestroy(): void {
    if (this.urlSubscription.length > 0) {
      this.urlSubscription.forEach(subs => subs.unsubscribe())
    }
  }

  buttonNavigate(path: string) {
    this.router.navigate([path], { relativeTo: this.route });
  }

  private loadUserPerfil() {
    const storedPerfil: any = localStorage.getItem(LocalStoageKey.LOGGED_USER);
    const perfil = JSON.parse(storedPerfil);
    this.userPerfilView = new PerfilMenu();
    if (perfil) {
      const names: string[] = perfil.name.split(' ');
      this.userPerfilView.name = names[0];
      this.userPerfilView.lastName = names[names.length - 1];
      this.userPerfilView.role = perfil.role;
    }
  }

}
