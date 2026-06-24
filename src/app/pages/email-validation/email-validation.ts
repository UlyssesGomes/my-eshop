import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { NewUserService } from '../new-user/new-user-service';

@Component({
  selector: 'app-email-validation',
  imports: [CommonModule, RouterModule, MessageModule],
  templateUrl: './email-validation.html',
  styleUrl: './email-validation.scss'
})
export class EmailValidation implements OnInit {

  public isValidEmail = false;
  public isBackendReplied = false;

  constructor(private readonly route: ActivatedRoute, private messageService: MessageService, private readonly newUserService: NewUserService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code != null) {
      this.newUserService.emailValidation(code).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', life: 6000, detail: 'Email validado com sucesso.' });
          this.isValidEmail = true;
          this.isBackendReplied = true;
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: error.title, life: 6000, detail: error.description });
          this.isBackendReplied = true;
        }
      });
    }

  }
}
