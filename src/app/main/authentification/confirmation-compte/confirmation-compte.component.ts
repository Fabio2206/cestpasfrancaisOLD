import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {CoreConfigService} from "../../../../@core/services/config.service";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../auth/service";

@Component({
  selector: 'app-confirmation-compte',
  templateUrl: './confirmation-compte.component.html',
  styleUrls: ['./confirmation-compte.component.scss']
})
export class ConfirmationCompteComponent implements OnInit {

  // Public
  public coreConfig: any;
  codeAccept: boolean = false;
  codeRefus: boolean = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param route
   * @param router
   * @param _authenticationService
   */
  constructor(private _coreConfigService: CoreConfigService,
              private route: ActivatedRoute,
              private router: Router,
              private _authenticationService: AuthenticationService) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });

    const codeInscription = this.route.snapshot.paramMap.get('codeInscription');

    if(codeInscription !== ''){

      this._authenticationService.confirmEmail(codeInscription).subscribe(
          (response) => {

          }, (error) => {

          }
      )

    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
