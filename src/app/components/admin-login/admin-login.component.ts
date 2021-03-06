import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  angForm: FormGroup;
  admin: {
    title: String,
    button1: String,
    button2:  String,
  };

  public options:any = {
    showProgressBar: false,
    position: ["top", "right"],
    timeOut: 2000,
    animate: "fade",
};

  constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router, private _service: NotificationsService) {
      this.angForm = this.fb.group({
        userId: ['', [Validators.required ]],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
    this.admin = this.dataService.getStaticData().admin;
  }

  postdata(angForm1: any){
      this.dataService.userlogin( angForm1.value.userId, angForm1.value.password )
      .pipe(first())
      .subscribe(
                data => {
                  const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : ['/dashboard/?'];
                  this.router.navigate([redirect + angForm1.value.userId]);
                },
                error =>{
                  this.onError();
                });
  }

  onError(){ this._service.error('Error','Email, UserId or Password Not Match'); }

  get userId() { return this.angForm.get('userId'); }
  get password() { return this.angForm.get('password'); }

}
