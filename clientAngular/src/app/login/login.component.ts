import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInfo: User;

  loginForm = this.formBuilder.group({
    email:['', Validators.required],
    password:['',Validators.required]
  });


  constructor(
    private formBuilder:FormBuilder,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
  }


  onSubmit(userInfo: User) {
    this.authenticationService.login(userInfo)
      .subscribe(data => {
        console.log(data)
      });
  }
}
