import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { variationPlacements } from '@popperjs/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LoginService } from '../services/login.service';
import { User } from '../model-classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm! : FormGroup;
  isInvalidCredentials!: boolean;
  
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    @Inject (SESSION_STORAGE) private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group( {
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      rememberMe: this.fb.control('')
    });
  }

  onSubmit() {
    this.loginService.getAllUsers().subscribe((data:User[]) =>{
      const user = data.find( (user: User) => user.email === (this.signInForm.value.email) );
      if (user) {
        if (user.password === this.signInForm.value.password) {
          this.isInvalidCredentials = false;
          this.storage.set('userName', user.userName );
          this.storage.set('userId', user.id);
          this.storage.set('isLoggedIn', true );
          this.storage.set('isAdmin', user.isAdmin);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
          this.storage.set('returnUrl', returnUrl);
          window.location.replace(returnUrl);
        } else {
          this.isInvalidCredentials = true;
          this.signInForm.get('password')?.reset();
        }

      } else {
        this.isInvalidCredentials = true;
        this.signInForm.get('password')?.reset();
      };

    })
  }

  validationError(field: string) {
    if(this.signInForm.get(field)?.invalid && this.signInForm.get(field)?.touched && this.signInForm.get(field)?.errors) {
      return true;
    }
    return false;
  }

}
