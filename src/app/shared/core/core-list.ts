import { ActivatedRoute, Router } from "@angular/router";
import { inject, Injectable, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { ConfirmationService } from "primeng/api";
import { PaginatorState } from "primeng/paginator";

import { NotificationService } from "../services/notification/notification.service";
import { ServiceCore } from "../services/service-core";
import { UTableActionEnum } from "../components/u-table/u-table-action-enum";

@Injectable()
export abstract class CoreList<M> implements OnInit {

    protected router: Router = inject(Router);
    protected route: ActivatedRoute = inject(ActivatedRoute);
    protected notification = inject(NotificationService);
    protected confirmationService = inject(ConfirmationService);

    first = 0
    pageSize = 10;
    totalElements = 0;

    isLoading = false;

    columnsWidth: number[] = [10, 35, 15, 15, 15, 10];

    paginatedMaterials: M[] = [];

    ngOnInit(): void {
        this.loadList();
    }

    loadList() {
        this.getService().listWithPagination(this.first, this.pageSize, this.getFilterForm().value).subscribe({
            next: response => {
                this.paginatedMaterials = response.content;
                this.totalElements = response.page.totalElements;
            },
            error: error => this.notification.error(error.title, error.description)
        });
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.pageSize = event.rows ?? 10;
        this.loadList();
    }

    goToNewItem() {
        this.router.navigate(['create'], { relativeTo: this.route });
    }

    columnActionEvent(event: any) {
        if (event.action === UTableActionEnum.EDIT) {
            this.router.navigate([event.item.id, 'edit'], { relativeTo: this.route });
        } else if (event.action === UTableActionEnum.DELETE) {

            this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: 'Você tem certeza que deseja deletar esse item?',
                header: 'Atenção!',
                icon: 'pi pi-exclamation-triangle',
                rejectLabel: 'Cancel',
                rejectButtonProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptButtonProps: {
                    label: 'Delete',
                    severity: 'danger'
                },

                accept: () => {
                    this.getService().deleteById(event.item.id).subscribe({
                        next: () => {
                            this.notification.success('Deletado', `Item com id ${event.item.id} foi deletado.`);
                            this.loadList();
                        },
                        error: error => {
                            this.notification.success(error.title, error.description);
                        }
                    });
                },
                reject: () => {
                    this.notification.warning('Cancelado', 'Operação de remoção cancelada.');
                }
            });
        }
    }

    filter() {
        this.loadList();
    }

    clearForm() {
        this.getFilterForm().reset();
        this.loadList();
    }

    public abstract getService(): ServiceCore<M>;

    public abstract getFilterForm(): FormGroup;
}