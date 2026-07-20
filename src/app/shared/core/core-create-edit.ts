import { ActivatedRoute } from "@angular/router";
import { inject, Injectable, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Location } from '@angular/common';

import { NotificationService } from "../services/notification/notification.service";
import { ServiceCore } from "../services/service-core";
import { take } from "rxjs";

@Injectable()
export abstract class CoreCreateEdit<M> implements OnInit {

    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected messageService = inject(NotificationService);
    protected location: Location = inject(Location);

    form!: FormGroup;
    protected fb: FormBuilder = inject(FormBuilder);

    id: any;
    loading = false;

    ngOnInit(): void {
        this.form = this.defineForm();
        this.loadCreatOrEditRoute();
    }

    private loadCreatOrEditRoute() {
        if (this.route.snapshot.url.toString().endsWith('edit')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.loading = true;

            this.loadData();
        }
    }

    loadData() {
        this.getService().getById(this.id).subscribe({
            next: (highlightResponse: any) => {
                this.preLoadData(highlightResponse);
                this.form.patchValue(highlightResponse);
            },
            error: (error) => {
                this.messageService.error(error.title, error.description);
                this.loading = false;
            }
        });
    }

    protected preLoadData(m: M): void {}

    save() {
        if (!this.id)
            this.create(this.form.value);
        else
            this.update(this.form.value);

    }

    create(formData: any) {
        this.getService().create(formData).pipe(take(1)).subscribe({
            next: (response) => {
                this.messageService.success('Criado Com Sucesso', `${this.featureName()} criado com sucesso.`);
                this.afterCreate();
                this.form.reset();
            },
            error: (error) => {
                this.messageService.error(error.title, error.description);
            }
        });
    }

    abstract afterCreate(): void;

    update(formData: any) {
        this.getService().updateById(this.id, formData).pipe(take(1)).subscribe({
            next: (response) => {
                this.messageService.success('Atualizado Com Sucesso', `${this.featureName()} atualizado com sucesso.`);
                this.form.reset();
                this.afterUpdate();
                this.location.back();
            },
            error: (error) => {
                this.messageService.error(error.title, error.description);
            }
        });
    }

    abstract afterUpdate(): void;

    abstract getService(): ServiceCore<M>;
    abstract defineForm(): FormGroup;
    abstract featureName(): string;
}
