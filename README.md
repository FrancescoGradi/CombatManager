# RPG Combat Manager

## A cross-platform app to manage buffs in your DnD/Pathfinder adventures

DnD and Pathfinder are very complex games, often there are many active **buffs** within battles.
This app wants to help the player to **count** all **bonus/malus** and to add them to basic modifiers.

It allows to select buff in a list and it provides _automatic updates_ for us.
It is divided into three principal tabs that represent **attack** phase, **defend** phase and **saving throws** 
(during the battle).

Interface was designed with **Material Design** rules (_Angular Material framework_ [1]) and code was written in _typescript_ 
and it was converted in iOS/Android app with **Ionic** [2]. Here some screenshots:

<div>
<p align="center">
<img src="demo/principale.png" width=auto height=480px>
<img src="demo/principale_dark.png" width=auto height=480px>
</p>
<div/>

## How to install
Code was developed and tested with:
- Ionic CLI 5.4.15
- Ionic Angular 4.11.8
- @angular-devkit/build-angular 0.801.3
- @angular-devkit/schematics 8.1.3
- @angular/cli 8.1.3
- @ionic/angular-toolkit 2.1.2
- Cordova CLI 9.0.0

After that you have to install all _npm_ dependencies. _Cordova_ is the real converter for Android/iOS [3].

### Browser
For *localhost* browser app, it is enough to run in terminal:
```
ionic serve
```

### Android
After configured Android SDK (more information <a href="https://ionicframework.com/docs/installation/android">here</a>),
you can build your `.apk` Android file with:
```
ionic cordova build android --prod
```

### iOS
It works only with Mac Os. You have to download XCode, Cordova provides an XCode app building for you
(more information <a href="https://ionicframework.com/docs/installation/ios">here</a>).
Run:
```
ionic cordova prepare ios --prod 
```
Open the newly created project and build with XCode. You can run it with emulated or physical device.


## App features
This app was developed to help player during the battle, it does not replace the character sheet. However several features
are implemented, you can:

- **add your characters**, including characteristics and basic modifiers.
- **add custom buff** that will included in specific buff list.
- **select your actual buffs** during the battle to visualize actual combat statistics. 
- **visualize all/active buff list** everytime you will need.

<div>
<p align="center">
<img src="demo/add_character1.png" width=auto height=480px>
<img src="demo/add_buff.png" width=auto height=480px>
</p>
<div/>

## Known issues
Automatic Dark Mode does not work on Android devices. Also older Android devices have some visualization troubles and 
soft updating problems.

## References

[1] https://material.angular.io/

[2] https://ionicframework.com/

[3] https://cordova.apache.org/
