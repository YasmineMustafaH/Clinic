import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RootComponent } from './root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component'
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
  { path: 'profile', redirectTo: '/profile', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    RootComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule, 
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  
  ],
  exports:[RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [RootComponent]
})
export class AppModule { }

