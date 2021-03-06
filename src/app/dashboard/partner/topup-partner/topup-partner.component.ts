
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { PartnerService } from 'src/app/services/partner.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-topup-partner',
  templateUrl: './topup-partner.component.html',
  styleUrls: ['./topup-partner.component.css']
})
export class TopupPartnerComponent implements OnInit {
  angForm: FormGroup;
  partner_id: string;
  admin_id: string;
  public options:any = {
    showProgressBar: false,
    position: ["bottom", "right"],
    timeOut: 2000,
    animate: "fade",
  };

  constructor(private fb: FormBuilder,
              private router:Router,
              private apiService: ApiService,
              private partnerService: PartnerService,
              private _service: NotificationsService,
              private routes: ActivatedRoute) {

      this.angForm = this.fb.group({
        amount: ['', [Validators.required]],
        partner_id: ['', [Validators.required]],

      });
  }

  ngOnInit() {
    this.admin_id = this.apiService.getToken();
    const routeParams = this.routes.snapshot.params;
    this.partner_id = routeParams.id;
    console.log("Referral ID: " + this.partner_id);
  }

  topUpPartner(angForm1: any){
    this.partnerService.addAmount( angForm1.value.partner_id, angForm1.value.amount )
      .pipe(first())
      .subscribe(
                  data => {
                    this.router.navigate([ '/dashboard/partner/recent-member/' + this.admin_id ]);
                  },
                  error => {
                    console.log("Error from TopUp")
                  }
                );
    // console.log(angForm1.value);

  }

  onSuccess(){ this._service.success('Successfully Registred'); }

  get amount() { return this.angForm.get('amount'); }

}
