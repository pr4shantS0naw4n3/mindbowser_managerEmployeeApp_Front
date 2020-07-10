import { NotificationService } from './../../notification.service';
import { ApiService } from './../../api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-9a-z]([.a-z_]*[0-9a-z])*@([0-9a-z][-a-z_]*[0-9a-z]\.)[0-9a-z\.]{1,3}[_a-z-]{1,2})$/)
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(/^[0-9]+$/)
    ]),
    id: new FormControl('')
  })

  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private notify: NotificationService
  ) { }

  ngOnInit() {
    if (this.data.method === 'update') {
      this.form.controls['firstName'].setValue(this.data.data.firstName)
      this.form.controls['lastName'].setValue(this.data.data.lastName)
      this.form.controls['email'].setValue(this.data.data.email)
      this.form.controls['phone_number'].setValue(this.data.data.phone_number)
      this.form.controls['id'].setValue(this.data.data.id)
    }
  }

  aoru() {
    if (this.data.method === 'update') {
      this.api.updateEmployee(this.form.value).subscribe((res) => {
        if (res.status === 200) {
          this.dialogRef.close()
        }
      }, (error) => {
        this.notify.pop('Invalid Data Entered')
      })
    } else {
      const json = {
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value,
        email: this.form.controls['email'].value,
        phone_number: this.form.controls['phone_number'].value,
      }

      this.api.addEmployee(json).subscribe((res) => {
        if (res.status === 201) {
          this.dialogRef.close()
        }
      }, (error) => {
        this.notify.pop('Invalid Data Entered')
      })
    }
  }

}
