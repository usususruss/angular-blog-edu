import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { AuthGuard } from "./shared/services/auth.guard";
import { AuthService } from "./shared/services/auth.service";

@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
                    { path: 'login', component: LoginPageComponent },
                    { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
                    { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
                    { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule],
    providers: [
        AuthService,
        AuthGuard
    ]
})
export class AdminModule {}
