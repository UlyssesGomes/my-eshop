import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

import { AvatarModule } from 'primeng/avatar'
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { LocalStoageKey } from '../../shared/enums/localstorage-key';
import { NavbarMenuItem } from '../../shared/models/menu-item/navbar-menu-item';
import { PerfilMenu } from '../../shared/models/perfil-menu/perfil-menu';
import { ProfileView } from '../../shared/components/profile-view/profile-view';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, RouterOutlet, AvatarModule, BadgeModule, ContentPanel, MenuModule, MessageModule, ProfileView],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit, OnDestroy {

  items: NavbarMenuItem[] | undefined;

  userPerfilView!: PerfilMenu;

  lastUrlPath?: string;

  isValidData?: boolean;
  isValidAddress?: boolean;

  subscriptions: any[] = [];

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly userProfileService: UserProfileService, private readonly messageService: MessageService) { }

  ngOnInit() {
    this.loadUserPerfil();
    this.loadUserPersonal();
    this.updateUserValidations();

    this.lastUrlPath = this.router.url.split('/').pop();
    this.subscriptions.push(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.lastUrlPath = event.url.split('/').pop();
      }
    }));

    this.items = [
      {
        title: 'Dados Pessoais',
        icon: 'pi pi-user',
        path: 'dados-pessoais',
        isValid: true
      },
      {
        title: 'Senha',
        icon: 'pi pi-key',
        path: 'senha',
        isValid: true
      },
      {
        title: 'Endereços',
        icon: 'pi pi-home',
        path: 'enderecos',
        isValid: true
      }
    ];
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(subs => subs.unsubscribe())
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

  private loadUserPersonal() {
    this.userProfileService.getUserPersonalValidations().subscribe({
      next: response => {
        this.isValidData = response.validData;
        this.isValidAddress = response.validAddress;

        if(!this.isValidData) {
          const index = this.items?.findIndex(i => i.title === 'Dados Pessoais');
          if(this.items && index != undefined && index >= 0)
            this.items[index].isValid = this.isValidData;
        }

        if(!this.isValidAddress) {
          const index = this.items?.findIndex(i => i.title === 'Endereços');
          if(this.items && index != undefined && index >= 0)
            this.items[index].isValid = this.isValidAddress;
        }
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: error.title, life: 6000, detail: error.description });
      }
    });
  }

  private updateUserValidations() {
    this.subscriptions.push(this.userProfileService.observable.subscribe( (updates: any) => {
      if(updates.subject === UserProfileService.USER_DATA){
        this.isValidData = updates.value;
      } else if(updates.subject === UserProfileService.USER_ADDRESS) {
        this.isValidAddress = updates.value;
      }
    }));
  }

}
