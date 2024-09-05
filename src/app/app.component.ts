import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { LoadingService } from './core/services/loading.service';
import { AsyncPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './core/enums/languages.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressBar, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loading: WritableSignal<number> = signal(0);
  constructor(
    private loadingService: LoadingService,
    private translateService: TranslateService,
  ) {
    this.loadingService.loading$.subscribe((loadingCount) => {
      this.loading.set(loadingCount);
    });
    const lang = localStorage.getItem('lang') || Language.UZ_LAT;
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
  }
}
