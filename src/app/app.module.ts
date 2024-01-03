import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PasswordRecuperationComponent } from './password-recuperation/password-recuperation.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { GroupComponent } from './group/group.component';
import { PictureComponent } from './picture/picture.component';
import { ReactionComponent } from './reaction/reaction.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpPageComponent,
    HomePageComponent,
    NavBarComponent,
    PasswordRecuperationComponent,
    PasswordChangeComponent,
    BlogPostComponent,
    CommentListComponent,
    CommentItemComponent,
    GroupComponent,
    PictureComponent,
    ReactionComponent,
    UserProfileComponent,
    BlogDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
