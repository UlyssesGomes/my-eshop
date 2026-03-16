import { HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";

import { environment } from "../../../environments/environment";

export abstract class ErrorHandler {
    
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