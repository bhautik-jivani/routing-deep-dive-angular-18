import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appconfig } from './app/app.config';

bootstrapApplication(AppComponent, appconfig).catch((err) => console.error(err));
