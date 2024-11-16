import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class  RegisterComponent {
  user: Iuser = {
    name: '',
    email: '',
    password: '',
    rol: 0
  }
  pwdConfirm:string = ''

  constructor( private router: Router, private userService: UserService) {}

  goToLogin():void {
    this.router.navigate(['/'])
  }

  register(): void {
    if(this.user.password === this.pwdConfirm){
      this.userService.register(this.user).subscribe(
        response => {
          console.log('Bienvenido', response);
          this.router.navigate(['/'])  
        }, error => {
          console.error('Error', error);
        } 
      )
    } else {
      alert('Su contraseña y confirmacion no coinciden')
    }
  }
}