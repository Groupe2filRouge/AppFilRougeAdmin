import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Link } from '../../dto/link';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit', 'delete'];
  
  dataSource!: MatTableDataSource<Link>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.route.data.subscribe((response: any) => {
        this.dataSource = new MatTableDataSource<Link>(response.list)
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public delete(id: number){
    alert(id)
  }
}

