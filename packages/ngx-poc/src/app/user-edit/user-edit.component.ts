import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoggedUserInfo } from 'business';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {
  userInfo: LoggedUserInfo = {name: null, age: null};
  subscrition: any;

  constructor(private service: UserService) {
    this.subscrition = this.service.state$.subscribe({
      next: (userInfo) => this.userInfo = {... userInfo}
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscrition.unsubscribe();
  }

  onSubmit(): Promise<void> {
    return this.service.setState(this.userInfo);
  }

}
