import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Link } from '../dto/link';
import { LinkService } from '../services/link.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListResolver implements Resolve<Link[]> {

  constructor(public service: LinkService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Link[]> {
    return this.service.getList().pipe(
      catchError((error) => {
         return of([]);
      }));
  }
}
