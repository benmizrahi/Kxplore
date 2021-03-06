import { Component } from '@angular/core';
import {StreamConsumerService} from './services/stream-consumer.service';
import {UserProfileService} from "./services/user-profile.service";
import {AuthenticationService} from "./services/authentication.service";
import { NbSidebarService } from '@nebular/theme';


@Component({
  selector: 'app-root',
  template: `
        <nb-layout>
          <nb-layout-header  *ngIf="authenticationService.isLogedIn()" fixed>
              <div class="header-container left" style="width: 86%;">
                  <div  class="logo-containter">
                      <a class="navigation" (click)="toggle()">
                        <i class="nb-menu"></i>
                      </a>
                      <div class="logo">
                        <img class="kafka-icon" src="assets/k_logo.png" />
                      </div>
                  </div>
              </div>
              <div class="header-container">
                <nb-actions size="medium" class="header-container right-header">
                  <nb-action>
                        <user-area></user-area>
                  </nb-action>
              </nb-actions>
              </div>
          </nb-layout-header> 
          <nb-sidebar state="collapsed" *ngIf="authenticationService.isLogedIn() && userProfileService.isAdmin()" >
            <nb-menu [items]="items">
            </nb-menu>
          </nb-sidebar>
          <nb-layout-column>
            <router-outlet></router-outlet>
          </nb-layout-column>
        </nb-layout>
  `,
  styles: [`
    .header-clean {
      margin: 0;
      padding: 0;
    }
    .logo-containter {
      font-weight: 600;
      padding: 0 1.25rem;
      font-size: 1.35rem;
      white-space: nowrap;
     }
     .navigation {
      padding-right: 1.25rem;
      font-size: 2.5rem;
      text-decoration: none;
      float: left;
     }
     .logo{
      padding-top: 9px;
     }
     .kafka-icon{
      width: 10%;
      margin: -6px 4px 4px 4px;
     }

    @media only screen and (max-width: 600px) {
      .kafka-icon{
        width: 65%;
        margin: 1px 5px 7px 0px;
      }
    }
  `]
})
export class AppComponent {
 
 
  constructor(public sidebarService: NbSidebarService,
    public authenticationService:AuthenticationService,
    public readonly userProfileService:UserProfileService){
  }

  items = [
    {
      title: 'Menu',
      expanded: true,
      children: [
        {
            title:"Live",
            link: "/",
        },
        {
          title:'Management',
          children: [
            {
              title: 'Environment',
              link: "/environments",
            },
            {
              title: 'Topics',
              link: "/topics",
            },
            {
              title: 'Users',
              link: "/users",
            },
            {
              title: 'Permissions',
              link: "/userPremissions",
            },
          ]
        }
      ]
    }
  ];

  toggle() {
    this.sidebarService.toggle(false);
    return false;
  }

}
