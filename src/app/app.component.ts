import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
        `ca_icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/CA Icon-1.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `damage_icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Damage Icon-1.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `ts_icon`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/TS Icon-1.svg`)
    );
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.statusBar.styleLightContent();
        this.statusBar.backgroundColorByHexString('#ca3e47');
      } else {
        this.statusBar.styleLightContent();
        this.statusBar.backgroundColorByHexString('#771520');
      }

      this.splashScreen.hide();
    });
  }
}
