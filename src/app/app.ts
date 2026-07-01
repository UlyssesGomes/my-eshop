import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { NotificationService } from './shared/services/notification/notification.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    ToastModule
  ],
  providers: [ConfirmationService, MessageService, NotificationService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('SuaEstampa');
}
