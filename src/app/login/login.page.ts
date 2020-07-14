import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
  }

  login(email, password) {
    this.authService.signIn(email.value, password.value)
    .then((res) => {
      if(this.authService.isEmailVerified) {
        this.router.navigate(['make-appointment'])
      } else {
        window.alert('email not verified');
        return false;
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  registerUser() {
    this.router.navigate(['registration']);
  }

  recoverPassword() {
    this.router.navigate(['password-recover']);
  }

  googleLogin() {
    this.authService.googleAuth();
  }
}
