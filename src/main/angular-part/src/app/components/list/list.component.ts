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
        if(!!result && result === true){ 
          console.log(`Dialog result: ${result} `+id);
        }
      });
    });
  }

  public delete(id: number){

    const dialogRef = this.dialog.open(DialogContentExampleDialog, {panelClass: 'app-full-bleed-dialog'});

    dialogRef.afterClosed().subscribe(result => {
      if(!!result && result === true){ 
        console.log(`Dialog result: ${result} `+id);
      }
    });
  }
}
