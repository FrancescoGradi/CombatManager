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
        `Barbaro`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Barbaro.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Bardo`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Bardo.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Chierico`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Chierico.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Druido`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Druido.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Guerriero`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Guerriero.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Ladro`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Ladro.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Mago`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Mago.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Monaco`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Monaco.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Paladino`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Paladino.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Ranger`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Ranger.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Stregone`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Stregone.svg`)
    );
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
    this.matIconRegistry.addSvgIcon(
        `Barbaro`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Barbaro.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Bardo`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Bardo.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Chierico`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Chierico.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Druido`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Druido.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Guerriero`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Guerriero.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Ladro`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Ladro.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Mago`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Mago.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Monaco`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Monaco.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Paladino`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Paladino.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Ranger`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Ranger.svg`)
    );
    this.matIconRegistry.addSvgIcon(
        `Stregone`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icon/Stregone.svg`)
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
