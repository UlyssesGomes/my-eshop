import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';

import { NotificationService } from '../../../shared/services/notification/notification.service';
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

  constructor(private readonly fb: FormBuilder, private readonly userProfileService: UserProfileService, private messageService: NotificationService) {
    this.form = this.fb.group({
      addresses: this.fb.array([])
    });

    this.addAddressField();
  }

  ngOnInit(): void {
    this.userProfileService.getUserAddresses().subscribe({
      next: response => {
        if(response.addresses.length > 1) {
          const newQuantity = response.addresses.length - 1;
          for(let u = 0; u < newQuantity; u++) {
            this.addAddressField();
          }
        }
        this.form.patchValue(response);
      },
      error: error => {
        this.messageService.error(error.title, error.description);
      }
    });
  }

  save() {
    this.userProfileService.patchUserAddress(this.form.value).subscribe({
      next: () => {
        this.messageService.success('Sucesso', 'Endereço do usuário atualizado com sucesso.');
        this.userProfileService.setValidAddress(true);
      },
      error: error => {
        this.messageService.error(error.title, error.description);
      }
    });
  }

  private addAddressField() {
    const formArray = this.form.get('addresses') as FormArray;

    formArray.push(this.fb.group({
      cep: ['', [Validators.required, Validators.minLength(8)]],
      street: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      complement: ['', [Validators.maxLength(20)]],
      neighborhood: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    }));
  }
}
