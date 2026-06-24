import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { UserAddressesCommonForm } from '../../../shared/components/user-addresses-common-form/user-addresses-common-form';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-address',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, UserAddressesCommonForm],
  templateUrl: './address.html',
  styleUrl: './address.scss'
})
export class Address implements OnInit {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly userProfileService: UserProfileService, private messageService: MessageService) {
    this.form = this.fb.group({
      addresses: this.fb.array([
        this.fb.group(
          {
            cep: ['', [Validators.required]],
            street: ['', [Validators.required, Validators.maxLength(60)]],
            number: ['', [Validators.required, Validators.minLength(1)]],
            complement: ['', [Validators.maxLength(20)]],
            neighborhood: ['', [Validators.required, Validators.maxLength(40)]],
            city: ['', [Validators.required, Validators.maxLength(40)]],
            state: ['', [Validators.required, Validators.maxLength(20)]]
          })])
    });
  }

  ngOnInit(): void {
    this.userProfileService.getUserAddresses().subscribe({
      next: response => {
        this.form.patchValue(response);
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.description, life: 6000 });
      }
    });
  }

  save() {
    this.userProfileService.patchUserAddress(this.form.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Endereço do usuário atualizado com sucesso.', life: 6000 });
        this.userProfileService.setValidAddress(true);
      },
      error: error => {
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.description, life: 6000 });
      }
    });
  }
}
