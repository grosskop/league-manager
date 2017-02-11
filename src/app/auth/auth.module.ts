import { TopLoginComponent } from './top-login/top-login.component';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';

export const authRoutes = [
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes),
        SharedModule
    ],
    exports: [
        RouterModule,
        TopLoginComponent
    ],
    declarations: [
        LoginComponent,
        TopLoginComponent
    ],
    providers: [
        AuthService
    ],
})
export class AuthModule { }