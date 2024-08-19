import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(ReactiveFormsModule), 
    provideAnimationsAsync(),
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
}).catch((err) => console.error(err));
