import { RouterModule, Routes} from '@angular/router';
import { CreateApplicationComponent } from './create-application.component';

export const createApplicationRoutes:Routes = [
    {path:'', component:CreateApplicationComponent}
];

export const createApplicationRouterModule = RouterModule.forChild(createApplicationRoutes);