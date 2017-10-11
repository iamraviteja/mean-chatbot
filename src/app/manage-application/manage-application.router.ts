import { RouterModule, Routes} from '@angular/router';
import { ManageApplicationComponent } from './manage-application.component';

export const manageApplicationRoutes:Routes = [
    {path:'', component:ManageApplicationComponent}
];

export const manageApplicationRouterModule = RouterModule.forChild(manageApplicationRoutes);