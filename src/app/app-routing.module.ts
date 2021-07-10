import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
import { SecureLayoutComponent } from './shared/components/layout/base/secure-layout.component';
  
const routes: Routes = [ 
  // { 
  //   path: '', 
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) 
  // }, 
  { 
    path: '', 
    component: SecureLayoutComponent, 
    children: [ 
      { 
        path: 'dashboard', 
        data: { title: 'Dashboard' }, 
        // canActivateChild: [ AuthorizedGuard ], 
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) 
      } 
    ] 
  },

  // { 
  //   // path: 'unauthorized', 
  //   // component: UnauthorizedAccessComponent 
  // }, 
  // { 
  //   // path: '**', 
  //   // component: PageNotFoundComponent 
  // } 
]; 

@NgModule({ 
  declarations: [], 
  imports: [ 
    CommonModule, 
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules, 
      scrollPositionRestoration: 'top' 
    }) 
  ], 
  exports: [ 
    RouterModule 
  ] 
}) 

export class AppRoutingModule { } 