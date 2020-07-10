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
    mobile: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern(/^[0-9]+$/)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/)
    ]),
    dob: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/)
    ]),
    company: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/)
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
    this.form.controls['password'].enable()
    if (this.data.method === 'update') {
      this.form.controls['firstName'].setValue(this.data.data.firstName)
      this.form.controls['lastName'].setValue(this.data.data.lastName)
      this.form.controls['email'].setValue(this.data.data.email)
      this.form.controls['mobile'].setValue(this.data.data.mobile)
      this.form.controls['city'].setValue(this.data.data.city)
      this.form.controls['dob'].setValue(this.data.data.dob)
      this.form.controls['address'].setValue(this.data.data.address)
      this.form.controls['company'].setValue(this.data.data.company)
      this.form.controls['password'].setValue(this.data.data.password)

      this.form.controls['password'].disable()
      this.form.controls['id'].setValue(this.data.data.id)
    }
  }

  aoru() {
    if (this.data.method === 'update') {
      this.form.controls['password'].enable()
      this.api.updateEmployee(this.form.value).subscribe((res) => {
        if (res.status === 200) {
          this.dialogRef.close()
        }
      }, (error) => {
        for (let i in error.error) {
          this.notify.pop(error.error[i])
          break;
        }
      })
    } else {
      const json = {
        firstName: this.form.controls['firstName'].value,
        lastName: this.form.controls['lastName'].value,
        email: this.form.controls['email'].value,
        mobile: this.form.controls['mobile'].value,
        city: this.form.controls['city'].value,
        dob: this.form.controls['dob'].value,
        password: this.form.controls['password'].value,
        address: this.form.controls['address'].value,
        company: this.form.controls['company'].value,
      }

      this.api.addEmployee(json).subscribe((res) => {
        if (res.status === 201) {
          this.dialogRef.close()
        }
      }, (error) => {
        for (let i in error.error) {
          this.notify.pop(error.error[i])
          break;
        }
      })
    }
  }

}
