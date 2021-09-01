import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Link } from '../dto/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  ELEMENT_DATA: Link[] = [
    {id: 1, gitProjectName: 'A', gitAdress: 'Git A', gitBranch: false, gitBranchName: 'main', s3Adress: 'S3 A', s3Login: 'login', s3Password: 'password', s3Name: 'Bucket A', slackChannel: 'C1', slackToken: 'token A'},
    {id: 2, gitProjectName: 'B', gitAdress: 'Git B', gitBranch: false, gitBranchName: 'main', s3Adress: 'S3 B', s3Login: 'login', s3Password: 'password', s3Name: 'Bucket A', slackChannel: 'C2', slackToken: 'token B'},
    {id: 3, gitProjectName: 'B', gitAdress: 'Git B', gitBranch: true, gitBranchName: 'B2', s3Adress: 'S3 Branche', s3Login: 'login', s3Password: 'password', s3Name: 'Bucket A', slackChannel: 'C3', slackToken: 'token C'}
  ];

  constructor() { }

  public getList(): Observable<Link[]>{
    return of(this.ELEMENT_DATA)
  }

  public get(id: number): Observable<any>{
    return of(this.ELEMENT_DATA.find(element => element.id === id));
  }

  public create(link: Link){
    
  }

  public modify(link: Link){

  }

  public delete(link: Link){

  }
}
