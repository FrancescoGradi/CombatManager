import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'ab', redirectTo: 'add-buff', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'add-buff',
    loadChildren: () => import('./add-buff/add-buff.module').then( m => m.AddBuffPageModule)
  },
  {
    path: 'add-character',
    loadChildren: () => import('./add-character/add-character.module').then( m => m.AddCharacterPageModule)
  },
  {
    path: 'edit-buff',
    loadChildren: () => import('./edit-buff/edit-buff.module').then( m => m.EditBuffPageModule)
  },
  {
    path: 'edit-character',
    loadChildren: () => import('./edit-character/edit-character.module').then( m => m.EditCharacterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
