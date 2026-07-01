import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { NewUserService } from '../new-user/new-user-service';

import { NotificationService } from '../../shared/services/notification/notification.service';

@Component({
  selector: 'app-email-validation',
  imports: [CommonModule, RouterModule],
  templateUrl: './email-validation.html',
  styleUrl: './email-validation.scss'
})
export class EmailValidation implements OnInit {

  public isValidEmail = false;
  public isBackendReplied = false;

  constructor(private readonly route: ActivatedRoute, private messageService: NotificationService, private readonly newUserService: NewUserService) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code != null) {
      this.newUserService.emailValidation(code).subscribe({
        next: () => {
        this.messageService.success('Sucesso', 'Email validado com sucesso.');
          this.isValidEmail = true;
          this.isBackendReplied = true;
        },
        error: (error) => {
          this.messageService.error(error.title, error.description);
          this.isBackendReplied = true;
        }
      });
    }

  }
}
