import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { LoggedUserInfo } from 'business';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  userInfo: LoggedUserInfo;
  subscrition: any;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.subscrition = this.service.state$.subscribe({
      next: (userInfo) => this.userInfo = userInfo
    });
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }

}
