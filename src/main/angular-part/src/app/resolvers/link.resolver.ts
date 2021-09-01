import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Link } from '../dto/link';
import { LinkService } from '../services/link.service';

@Injectable({
  providedIn: 'root'
})
export class LinkResolver implements Resolve<any> {

  constructor(public service: LinkService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = <string>route.paramMap.get('id');
    return this.service.get(parseInt(id)).pipe(
      catchError((error) => {
         return of(null);
      }));
  }
}
