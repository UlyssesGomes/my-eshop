import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";

import { BehaviorSubject, catchError, filter, Observable, switchMap, take, tap, throwError } from "rxjs";

import { AuthenticationService } from "./authentication.service";
import { LocalStoageKey } from "../../enums/localstorage-key";
import { TokenUtils } from "../../utils/token-utils";

let isRefreshing = false;

const refreshUrl = 'authenticate/refresh';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LocalStoageKey.ACCESS_TOKEN);  
  const authService = inject(AuthenticationService);

  let authReq = addToken(req, token);

  return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.endsWith(refreshUrl)) {
        return handle401(req, authService, next);
      }
      return throwError(() => error);
    })
  );
};

function handle401(
  req: HttpRequest<unknown>,
  authService: AuthenticationService,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const refreshSubject = new BehaviorSubject<string | null>(null);  
  if (!isRefreshing) {
    isRefreshing = true;
    refreshSubject.next(null);

    return authService.refresh().pipe(
      tap(({ accessToken }) => {
        isRefreshing = false;
        refreshSubject.next(accessToken);
        TokenUtils.receiveJwtToken(accessToken);
      }),
      switchMap(({ accessToken }) => next(addToken(req, accessToken))),
      catchError((err) => {
        isRefreshing = false;
        TokenUtils.clearUserAndToken();
        // TODO - redirect to login if user come from a restricted area.
        return throwError(() => err);
      })
    );
  }

  // // Outras requisições aguardam o refresh terminar
  return refreshSubject.pipe(
    filter((token): token is string => token !== null),
    take(1),
    switchMap((token) => next(addToken(req, token)))
  );
}

function addToken(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  if (token && TokenUtils.isValidToken(token)) {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return req;
}
