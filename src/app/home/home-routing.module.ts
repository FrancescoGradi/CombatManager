import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from "./home.page";
import {AddBuffPage} from "../add-buff/add-buff.page";
import {EditBuffPage} from "../edit-buff/edit-buff.page";
import {AddCharacterPage} from "../add-character/add-character.page";
import {EditCharacterPage} from "../edit-character/edit-character.page";

const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'add-buff',
        component: AddBuffPage
    },
    {
        path: 'edit-buff',
        component: EditBuffPage
    },
    {
        path: 'add-character',
        component: AddCharacterPage
    },
    {
        path: 'edit-character',
        component: EditCharacterPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class HomePageRoutingModule {}