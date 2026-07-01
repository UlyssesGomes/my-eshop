import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {  

  constructor(private message: MessageService) { }

  private defaultNotification(title: string, content: string, type: string, life: number = 6000) {
    this.message.add({
      severity: type,
      summary: title,
      detail: content,
      life: life
    });
  }

  success(title: string, content: string, life: number = 6000) {
    this.defaultNotification(title, content, 'success', life);
  }

  info(title: string, content: string, life: number = 6000) {
    this.defaultNotification(title, content, 'info', life);
  }

  secondary(title: string, content: string, life: number = 6000) {
    this.defaultNotification(title, content, 'secondary', life);
  }

  error(title: string, content: string, life: number = 6000) {
    this.defaultNotification(title, content, 'error', life);
  }

  warning(title: string, content: string, life: number = 6000) {
    this.defaultNotification(title, content, 'warn', life);
  }
}
