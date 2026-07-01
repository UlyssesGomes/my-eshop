import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

import { debounceTime, Subject, take } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { ErrorReaderPipe } from '../../pipes/error-reader/error-reader-pipe';
import { MultifieldPanel } from '../multifield-panel/multifield-panel';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-user-addresses-common-form',
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MultifieldPanel,
    ButtonModule,
    FloatLabelModule,
    InputTextModule,
    ErrorReaderPipe,
    MessageModule,
    MultifieldPanel,
    NgxMaskDirective
  ],
  templateUrl: './user-addresses-common-form.html',
  styleUrl: './user-addresses-common-form.scss',
  providers: [provideNgxMask()]
})
export class UserAddressesCommonForm {

  @Input()
  form!: FormGroup;

  private inputSubject = new Subject<any>();
  subscription: any;

  _addressArray!: FormArray;
  get addressArray() { return this._addressArray; }

  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private messageService: NotificationService) { }

  ngOnInit(): void {
    this.inputSubject
      .pipe(debounceTime(500))
      .subscribe(valor => {
        this.getAddress(valor);
      });

    this._addressArray = this.form.get('addresses') as FormArray;
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  addAddressField() {
    if (!this.form.get('addresses'))
      this.form.addControl('addresses', this._addressArray);

    this._addressArray.push(this.fb.group({
      cep: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.maxLength(60)]],
      number: ['', [Validators.required, Validators.minLength(2)]],
      complement: ['', [Validators.maxLength(20)]],
      neighborhood: ['', [Validators.required, Validators.maxLength(20)]],
      city: ['', [Validators.required, Validators.maxLength(20)]],
      state: ['', [Validators.required, Validators.maxLength(20)]]
    }));
  }

  removeAddressField(index: number) {
    let addressFormArray: FormArray = this.form.get('addresses') as FormArray;
    if (addressFormArray.length > 1) {
      addressFormArray.removeAt(index);
    } else {
      this.messageService.warning('Ação Bloqueada', `É necessário cadastrar pelo menos 1 endereço.`);
    }
  }

  getAddress(value: any) {
    try {
      this.http.get<any>(`http://viacep.com.br/ws/${value.cep}/json/ `).pipe(take(1)).subscribe({
        next: (response) => {
          this._addressArray.at(value.index).get('street')?.setValue(response.logradouro);
          this._addressArray.at(value.index).get('neighborhood')?.setValue(response.bairro);
          this._addressArray.at(value.index).get('city')?.setValue(response.localidade);
          this._addressArray.at(value.index).get('state')?.setValue(response.uf);
        }
      });
    } catch (e) {
      console.warn('Error while request address with cep: ', value.cep);
    }
  }

  getDelayedAddress(event: any, index: number) {
    const inputCep = this._addressArray.at(index).get('cep')?.value;
    this.inputSubject.next({ 'cep': inputCep, 'index': index });
  }
}
