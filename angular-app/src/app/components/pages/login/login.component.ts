import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
      email: '',
      password: ''
  };

  showMessageError = false;

  constructor(
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    this.authService.login(this.credentials)
        .subscribe((data) => {
          const token = data.token;
          this.router.navigate(['categories/list'])
        }, error => this.showMessageError = true);
    return false;
  }
}
