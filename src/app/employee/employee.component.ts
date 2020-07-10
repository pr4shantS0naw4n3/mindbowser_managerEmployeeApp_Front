import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { ApiService } from './../api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empList: MatTableDataSource<any>;
  displayedColumns: string[] = ['EmployeeName', 'emailId', 'phone_number', 'actions']
  constructor(
    private apiservice: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.getlist()
    } else {
      this.router.navigate([''])
    }
  }

  getlist() {
    this.apiservice.empGetList().subscribe(async (res) => {
      const data = await res
      if (data.status === 200) {
        this.empList = new MatTableDataSource(data.EmployeeData)
      }
    }, (error) => {
      // if (error.status !== 200) {
      //   this.router.navigate([''])
      // }
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }

  delete(data) {
    this.apiservice.deleteEmployee(data.id.split('-').join('')).subscribe((res) => {

      if (res.status === 200) {
        this.getlist()
      }
    })
  }

  update(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '25%';
    dialogConfig.height = '70%'
    dialogConfig.data = {
      data: data,
      method: 'update'
    };
    const dialogref = this.dialog.open(DialogboxComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      this.getlist()
    })
  }

  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '25%';
    dialogConfig.height = '70%'
    dialogConfig.data = {
      method: 'add'
    };
    const dialogref = this.dialog.open(DialogboxComponent, dialogConfig);
    dialogref.afterClosed().subscribe(res => {
      this.getlist()
    })
  }
}
