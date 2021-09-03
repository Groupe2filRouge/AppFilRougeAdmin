import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateComponent } from './components/create/create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-part';

  constructor( private router: Router, public dialog: MatDialog){

  }

  public add(){
    const dialogRef = this.dialog.open(CreateComponent, {
      panelClass: 'app-full-bleed-dialog', 
      data: { myData: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!!result && result === true){ 
        console.log(`Dialog result: ${result} `);
      }
    });
  }
}
