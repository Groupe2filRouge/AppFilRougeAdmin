import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Link } from '../dto/link';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  private linkUrl = `http://15.188.77.176:5000/projet/v1.0/liens`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE' })
  };

  constructor(private http: HttpClient) { }

  public getList(): Observable<Link[]>{
    return this.http.get<Link[]>(`${this.linkUrl}`, this.httpOptions)
  }

  public get(id: any): Observable<Link>{
    return this.http.get<Link>(`${this.linkUrl}/${id.$oid}`, this.httpOptions)
  }

  public create(link: Link){
    return this.http.post<Link[]>(`${this.linkUrl}`, link, this.httpOptions)
  }

  public modify(link: Link){
    return this.http.put<Link[]>(`${this.linkUrl}`, link, this.httpOptions)
  }

  public delete(id: any){
    return this.http.delete<Link[]>(`${this.linkUrl}/${id.$oid}`, this.httpOptions)
  }
}
