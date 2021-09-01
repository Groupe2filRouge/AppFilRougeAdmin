import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Link } from '../../dto/link';
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

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit() {
      this.route.data.subscribe((response: any) => {
        this.dataSource = new MatTableDataSource<Link>(response.list)
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public delete(id: number){

    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(!!result && result === true){ 
        console.log(`Dialog result: ${result} `+id);
      }
    });
  }
}
