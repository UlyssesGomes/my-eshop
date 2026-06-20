import { HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";

import { environment } from "../../../environments/environment";
import { ErrorApiResponse } from "../models/error/error-api-response";

export abstract class ErrorHandler {

    /**
     * Tratamento de erros
     */
    protected handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Ocorreu um erro desconhecido';
        let errorTitle = 'Erro';

        if (error.error instanceof ErrorEvent) {
            // Erro do lado do cliente
            errorMessage = `Erro: ${error.error.message}`;
        } else if (error instanceof ErrorApiResponse) {
            errorMessage = error.description;
            errorTitle = error.title;
        } else {
            // Erro do lado do servidor
            switch (error.status) {
                case 400:
                    errorTitle = 'Requisição inválida';
                    break;
                case 401:
                    errorTitle = 'Não autorizado';
                    break;
                case 403:
                    errorTitle = 'Acesso negado';
                    break;
                case 404:
                    errorTitle = 'Recurso não encontrado';
                    break;
                case 500:
                    errorTitle = 'Erro interno do servidor';
                    break;
                case 503:
                    errorTitle = 'Serviço indisponível';
                    break;
                default:
                    errorTitle = `Erro ${error.status}`;
            }

            // Adiciona mensagem do backend se existir
            if (error?.error.error) {
                errorMessage = `${error.error.error}`;
            } else if(error.status) {
                errorMessage = errorTitle;
            }
        }

        if (environment.enableDebug) {
            console.error('Error HTTP:', error);
            console.error('Message:', errorMessage);
        }

        return throwError(() => new ErrorApiResponse(errorTitle, errorMessage));
    }
}