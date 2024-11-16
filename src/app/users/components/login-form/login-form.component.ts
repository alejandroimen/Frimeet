import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  user: Iuser = {
    name: '',
    email: '',
    password: '',
    rol: 0
  }
  
  constructor( private router: Router, private userService: UserService) {}

  goToRegister():void {
    this.router.navigate(['/register'])
  }

  login():void {
    this.userService.login(this.user).subscribe(
      response => {
        console.log('Bienvenido', response);
        this.router.navigate(['/'])  
      }, error => {
        console.error('Error', error);
      } 
    )
  }

}
