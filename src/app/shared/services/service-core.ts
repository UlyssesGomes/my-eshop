import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from "../../../environments/environment";
import { catchError, Observable, retry, tap } from "rxjs";
import { Injectable } from "@angular/core";

import { ErrorHandler } from "./error-handler";

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}

@Injectable()
export abstract class ServiceCore<M> extends ErrorHandler {
    protected urlBase = environment.apiUrl;

    constructor(protected readonly http: HttpClient) {
        super();
        if (environment.enableDebug) {
            console.info('Backend API URL:', this.urlBase);
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
            catchError(this.handleError)
        );
    }

    listWithPagination(
        first: number = 1,
        pageSize: number = 10,
        filters?: { [key: string]: any }
    ): Observable<any> {
        const url = `${this.urlBase}${this.getEndpoint()}`;
        const headers = this.getHeaders();

        const page = first / pageSize;

        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', pageSize.toString());

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

        return headers;
    }

}
