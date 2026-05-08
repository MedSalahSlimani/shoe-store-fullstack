// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { ListShoesComponent } from './list-shoes/list-shoes';
import { AddShoesComponent } from './add-shoes/add-shoes';
import { UpdateShoesComponent } from './update-shoes/update-shoes';
import { SearchShoesComponent } from './search-shoes/search-shoes';
import { DashboardComponent } from './dashboard/dashboard';
import { Connect } from './connect/connect';  // ← Vérifie le nom exact de ton composant
import { AuthGuard } from './guard/auth.guard';
import { ChatComponent } from './chat/chat.component';


export const routes: Routes = [
  { path: 'connect', component: Connect },  // ← AJOUTER CETTE LIGNE
  { path: 'list-shoes', component: ListShoesComponent, canActivate: [AuthGuard] },
  { path: 'add-shoes', component: AddShoesComponent, canActivate: [AuthGuard] },
  { path: 'update-shoes/:id', component: UpdateShoesComponent, canActivate: [AuthGuard] },
  { path: 'search-shoes', component: SearchShoesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/connect', pathMatch: 'full' }  
];