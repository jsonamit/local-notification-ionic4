import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss'],
})
export class JoinComponent implements OnInit {


  public loginForm: FormGroup;
  userData: any;
  data: any;
  Data: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private uservice: UserService,
    public toastController: ToastController,
    public popoverController: PopoverController,
    private localNotifications: LocalNotifications,
    private Alert: AlertController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        console.log('click localNotifications', msg);
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        console.log('trigger localNotifications', msg);
        this.showAlert(res.title, res.text, msg);
      });


    });
  }

  getSchedule() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Schedule notification',
      data: { mydata: 'this is my data' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND }
    })
  }

  getSecond() {
    this.localNotifications.schedule({
      id: 2,
      title: 'Attention',
      text: 'Second notification',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    })
  }

  getDaily() {
    this.localNotifications.schedule({
      id: 3,
      title: 'Good Morning',
      text: 'Daily notification',
      trigger: { every: { hour: 11, minute: 50 } }
    })
  }

  getAll() {
    this.localNotifications.getAll().then(res => {
      this.Data = res;
    })
  }

  showAlert(header, sub, msg) {
    this.Alert.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present())
  }

  saveUserDetail() {
    this.uservice.post('/saveUserDetail', 'amit').subscribe(res => {
      this.userData = res;
    });
  }

  getData() {
    this.data = localStorage.getItem('name');
  }


}
