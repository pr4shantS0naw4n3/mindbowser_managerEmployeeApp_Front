import { NotificationService } from './../notification.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private notify: NotificationService,
  ) { }

  ngOnInit() {
  }

  login() {
    let response;
    this.apiservice.login(this.loginForm.value).subscribe(async (res) => {
      const data = await res
      if (data.status === 200) {
        localStorage.setItem('token', data.token)
        this.router.navigate(['/dashboard'])
      }
    }, (error) => {
      this.notify.pop('Authorization Error, Invalid emailId or password')
    })

  }

}
