import { RouterModule, Routes } from '@angular/router';

export const appRoutes:Routes =[
    {path:'manageApplication', loadChildren:'./manage-application/manage-application.module#ManageApplicationModule'},
    {path:'createApplication', loadChildren:'./create-application/create-application.module#CreateApplicationModule'},
    {path:'', redirectTo:'/manageApplication', pathMatch:'full'}
];

export const appRouterModule = RouterModule.forRoot(appRoutes);