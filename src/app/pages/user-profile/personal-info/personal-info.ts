import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { CpfValidator } from '../../../shared/validators/cpf/cpf-validator';
import { UserInfoCommonForm } from '../../../shared/components/user-info-common-form/user-info-common-form';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-personal-info',
  imports: [CommonModule, FormsModule, MessageModule, ReactiveFormsModule, ButtonModule, UserInfoCommonForm],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.scss'
})
export class PersonalInfo implements OnInit {

  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly userProfileService: UserProfileService, private readonly messageService: MessageService ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14), new CpfValidator().validate()]],
      birth: [null, [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    });
  }

  ngOnInit(): void {
    this.userProfileService.getUserPersonal().subscribe({
      next: response => {
        if(response.birth)
          response.birth = new Date(response.birth);
        this.form.patchValue(response);
      },
      error: error => {
        this.messageService.add({severity: 'error', summary: error.title, detail: error.description, life: 6000});
      }
    });
  }

  save() {
    this.userProfileService.patchUserPersonal(this.form.value).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado com sucesso.', life: 6000});
        this.userProfileService.setValidData(true);
      },
      error: error => {
        this.messageService.add({severity: 'error', summary: error.title, detail: error.description, life: 6000});
      }
    });
  }
}
