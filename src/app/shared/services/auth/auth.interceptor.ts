import { HttpInterceptorFn } from "@angular/common/http";
import { LocalStoageKey } from "../../enums/localstorage-key";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LocalStoageKey.ACCESS_TOKEN);

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};