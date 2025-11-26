import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { catchError, Observable, retry, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

@Injectable()
export abstract class ServiceCore<M> {
    protected urlBase = environment.apiUrl;

    constructor(protected readonly http: HttpClient) {
        if (environment.enableDebug) {
            console.log('Backend API URL:', this.urlBase);
        }
    }

    create(model: M) {
        const url = this.urlBase + this.getEndpoint();
        const headers = this.getHeaders();

        if (environment.enableDebug) {
            console.info(`POST ${this.getEndpoint()}: `, url, model);
        }

        return this.http.post<M>(url, model, { headers }).pipe(
            tap(response => {
                if (environment.enableDebug) {
                    console.info(`${this.getEndpoint()} POST response: `, response);
                }
            }),
            retry(1),
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<M> {
        const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
        const headers = this.getHeaders();

        if (environment.enableDebug) {
            console.info(`GET ${this.getEndpoint()}: `, url);
        }

        return this.http.get<M>(url, { headers }).pipe(
            tap(response => {
                if (environment.enableDebug) {
                    console.info(`${this.getEndpoint()} GET response by ID: `, response);
                }
            }),
            retry(1),
            catchError(this.handleError)
        );
    }

    listAll(): Observable<M[]> {
        const url = `${this.urlBase}${this.getEndpoint()}/listAll`;
        const headers = this.getHeaders();

        if (environment.enableDebug) {
            console.info(`GET all ${this.getEndpoint()}: `, url);
        }

        return this.http.get<M[]>(url, { headers }).pipe(
            tap(response => {
                if (environment.enableDebug) {
                    console.info(`${this.getEndpoint()} GET all response: `, response);
                }
            }),
            retry(1),
            catchError(this.handleError)
        );
    }

    listWithPagination(
        page: number = 1,
        pageSize: number = 10,
        filters?: { [key: string]: any }
    ): Observable<PaginatedResponse<M>> {
        const url = `${this.urlBase}${this.getEndpoint()}`;
        const headers = this.getHeaders();

        let params = new HttpParams()
            .set('page', page.toString())
            .set('pageSize', pageSize.toString());

        // Adiciona filtros opcionais
        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters[key] !== null && filters[key] !== undefined) {
                    params = params.set(key, filters[key].toString());
                }
            });
        }

        if (environment.enableDebug) {
            console.info(`GET all paginated ${this.getEndpoint()}: `, url, params.toString());
        }

        return this.http.get<PaginatedResponse<M>>(url, { headers, params }).pipe(
            tap(response => {
                if (environment.enableDebug) {
                    console.info(`${this.getEndpoint()} GET all paginated response: `, response);
                }
            }),
            retry(1),
            catchError(this.handleError)
        );
    }

    updateById(id: number, data: Partial<M>): Observable<M> {
        const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
        const headers = this.getHeaders();

        if (environment.enableDebug) {
            console.info(`PUT ${this.getEndpoint()}: `, url, data);
        }

        return this.http.put<M>(url, data, { headers }).pipe(
            tap(response => {
                if (environment.enableDebug) {
                    console.info(`${this.getEndpoint()} PUT: `, response);
                }
            }),
            retry(1),
            catchError(this.handleError)
        );
    }

    patchById(id: number, data: Partial<M>): Observable<M> {
        const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
        const headers = this.getHeaders();

        if (environment.enableDebug) {
            console.info(`PATCH ${this.getEndpoint()}: `, url, data);
        }

        return this.http.patch<M>(url, data, { headers }).pipe(
            tap(response => {
                if (environment.enableDebug) {
                    console.info(`${this.getEndpoint()} PATCH: `, response);
                }
            }),
            retry(1),
            catchError(this.handleError)
        );
    }

    deleteById(id: number): Observable<void> {
        const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
        const headers = this.getHeaders();

        if (environment.enableDebug) {
            console.info(`DELETE ${this.getEndpoint()}: `, url);
        }

        return this.http.delete<void>(url, { headers }).pipe(
            tap(() => {
                if (environment.enableDebug) {
                    console.info(`${this.getEndpoint()} DELETE was deleted with success. `);
                }
            }),
            retry(1),
            catchError(this.handleError)
        );
    }

    /**
     * Implement to tell which source this api will consume.
     * Ex: if you are in user feature, return string 'user'.
     */
    protected abstract getEndpoint(): string;

    protected getHeaders(): HttpHeaders {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        // Add api key when exists
        // if (environment.apiKey) {
        //     headers = headers.set('X-API-Key', environment.apiKey);
        // }

        // Add auth when exists
        // const token = this.getAuthToken();
        // if (token) {
        //     headers = headers.set('Authorization', `Bearer ${token}`);
        // }

        return headers;
    }

    /**
     * Tratamento de erros
     */
    protected handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            errorMessage = `Erro: ${error.error.message}`;
        } else {
            // Erro do lado do servidor
            switch (error.status) {
                case 400:
                    errorMessage = 'Requisição inválida';
                    break;
                case 401:
                    errorMessage = 'Não autorizado. Faça login novamente';
                    break;
                case 403:
                    errorMessage = 'Acesso negado';
                    break;
                case 404:
                    errorMessage = 'Recurso não encontrado';
                    break;
                case 500:
                    errorMessage = 'Erro interno do servidor';
                    break;
                case 503:
                    errorMessage = 'Serviço indisponível';
                    break;
                default:
                    errorMessage = `Erro ${error.status}: ${error.message}`;
            }

            // Adiciona mensagem do backend se existir
            if (error.error?.message) {
                errorMessage += ` - ${error.error.message}`;
            }
        }

        if (environment.enableDebug) {
            console.error('Error HTTP:', error);
            console.error('Message:', errorMessage);
        }

        return throwError(() => new Error(errorMessage));
    }
}
