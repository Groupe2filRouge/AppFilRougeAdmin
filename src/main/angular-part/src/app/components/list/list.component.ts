import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Link } from '../../dto/link';
import { LinkService } from '../../services/link.service';
import { CreateComponent } from '../create/create.component';
import { DialogContentExampleDialog } from './dialog-content-example-dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['project', 'adress', 'isBranch', 'branch', 's3', 'bucket', 'channel', 'edit', 'delete'];
  
  dataSource!: MatTableDataSource<Link>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public service: LinkService) {}

  ngOnInit() {
      this.route.data.subscribe((response: any) => {
        this.dataSource = new MatTableDataSource<Link>(response.list)
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onClickOpenDialog(id: number) {
    return this.service.get(id).subscribe(receivedData => {
      const dialogRef = this.dialog.open(CreateComponent, {
        panelClass: 'app-full-bleed-dialog', 
        data: { myData: receivedData },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.warn(result);
        if(!!result && !!id){ 
          console.log(`Create result: ${result} `+id);
            this.dataSource.data = this.service.modify(this.convert2Link(result));
          } 
      });
    });
  }

  public delete(id: number){

    const dialogRef = this.dialog.open(DialogContentExampleDialog, {panelClass: 'app-full-bleed-dialog'});

    dialogRef.afterClosed().subscribe(result => {
      if(!!result && result === true){ 
        console.log(`Dialog result: ${result} `+id);
        this.dataSource.data = this.service.delete(id);
      }
    });
  }

  public convert2Link(form: any): Link {
    form = form.form;
    const result: Link = new Link();
    result.id = form.id;
    result.gitAdress = form.adress;
    result.gitBranch = form.branch;
    result.gitBranchName = form.branchName;
    result.gitProjectName = form.project;
    result.s3Adress = form.s3;
    result.s3Login = form.key;
    result.s3Name = form.bucket;
    result.s3Password = form.secret;
    result.slackChannel = form.channel;
    result.slackToken = form.token;
    console.log(result);
    return result;
  }

  public add(){
    const dialogRef = this.dialog.open(CreateComponent, {
      panelClass: 'app-full-bleed-dialog', 
      data: { myData: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result){ 
        console.log(`Dialog result: ${result} `);
        this.dataSource.data = this.service.create(this.convert2Link(result));
      }
    });
  }
}
