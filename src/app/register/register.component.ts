import { NotificationService } from './../notification.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signinForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-9a-z]([.a-z_]*[0-9a-z])*@([0-9a-z][-a-z_]*[0-9a-z]\.)[0-9a-z\.]{1,3}[_a-z-]{1,2})$/)
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  })
  constructor(
    private apiservice: ApiService,
    private notify: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.apiservice.register(this.signinForm.value).subscribe((res) => {
      if (res.status === 201) {
        this.notify.pop(res.message + " Please Login !!")
        this.router.navigate([''])
      }
    }, (error) => {
      for (let i in error.error) {
        this.notify.pop(error.error[i])
        break;
      }
    })
  }

}
