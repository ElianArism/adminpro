import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    // redireccionar gracias al objeto router del routerModule
    this.router.navigateByUrl('/dashboard');
  }

  register() {
    // redireccionar gracias al objeto router del routerModule
    this.router.navigateByUrl('auth/register');
  }
}
