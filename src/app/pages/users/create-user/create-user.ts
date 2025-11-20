import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { debounceTime, Subject, take } from 'rxjs';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { CpfValidator } from '../../../shared/validators/cpf/cpf-validator';
import { ErrorReaderPipe } from '../../../shared/pipes/error-reader/error-reader-pipe';
import { EmailValidator } from '../../../shared/validators/email/email-validator';
import { MultifieldPanel } from '../../../shared/components/multifield-panel/multifield-panel';
import { UserType } from '../../../shared/enums/user-type';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-user',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ContentPanel,
    DatePickerModule,
    ErrorReaderPipe,
    FloatLabelModule,
    InputNumberModule,
    InputTextModule,
    MessageModule,
    MultifieldPanel,
    SelectModule,
    NgxMaskDirective
  ],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss',
  providers: [provideNgxMask()]
})
export class CreateUser implements OnInit, OnDestroy {

  form!: FormGroup;

  maxDate = new Date();
  phoneMask: string = '(99) 9 9999-9999';

  private inputSubject = new Subject<any>();
  subscription: any;

  _addressArray!: FormArray;
  get addressArray() { return this._addressArray; }

  userTypes = [
    { type: 'Proprietário', value: UserType.OWNER },
    { type: 'Administrador', value: UserType.ADMIN },
    { type: 'Funcionário', value: UserType.EMPLOYEE },
    { type: 'Consumidor', value: UserType.CUSTOMER }
  ];

  private readonly emailRegex = /^[a-zA-Z0-9._&$#%+\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;

  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient, private messageService: MessageService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(10)]],
      type: [0, [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14), new CpfValidator().validate()]],
      birth: [null, [Validators.required]],
      email: ['', [Validators.required, new EmailValidator(this.emailRegex).validate()]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      addresses: this.fb.array([
        this.fb.group(
          {
            cep: ['', [Validators.required]],
            street: ['', [Validators.required, Validators.maxLength(60)]],
            number: ['', [Validators.required, Validators.minLength(2)]],
            complement: ['', [Validators.maxLength(20)]],
            neighborhood: ['', [Validators.required, Validators.maxLength(20)]],
            city: ['', [Validators.required, Validators.maxLength(20)]],
            state: ['', [Validators.required, Validators.maxLength(20)]]
          })])
    });
  }

  ngOnInit(): void {
    this.inputSubject
      .pipe(debounceTime(500))
      .subscribe(valor => {
        this.getAddress(valor);
      });

    this._addressArray = this.form.get('addresses') as FormArray;
  }

  ngOnDestroy(): void {
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
      this.messageService.add({
        severity: 'warn',
        summary: 'Ação Bloqueada',
        life: 4000,
        detail: `É necessário cadastrar pelo menos 1 endereço.`
      });
    }
  }

  getmeuaddrs() {
    return this._addressArray;
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

  save() {
    console.log('Salvando usuário: ', this.form.value);
    this.form.reset();
  }
}
