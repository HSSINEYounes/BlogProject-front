import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordRecuperationComponent } from './password-recuperation/password-recuperation.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

const routes: Routes = [
  {path: "", component: LoginPageComponent},
  {path: "login", component: LoginPageComponent},
  {path: "sign-up", component: SignUpPageComponent},
  {path: "password-recuperation", component: PasswordRecuperationComponent},
  {path: "password-change", component: PasswordChangeComponent},
  {path: "homePage", component: HomePageComponent},
  {path: "profile", component: UserProfileComponent},
  {path: 'profile/:id', component: UserProfileComponent},
  {path: 'blogDetails/:id', component: BlogDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
