import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onUpdateUserProfileSubmit() {
    this.authService.updateUserProfile(this.user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('Updated User Profile', {cssClass: 'alert-success', timeout: 3000});
      }
      else {
        this.flashMessagesService.show('Unable to update User Profile', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}
