import { Component, EventEmitter, Output } from '@angular/core'
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu'
import { MatTooltip } from '@angular/material/tooltip'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { MatIcon } from '@angular/material/icon'
import { Language } from '../../../core/enums/languages.enum'

@Component({
  selector: 'app-lang-select',
  standalone: true,
  imports: [
    MatMenu,
    MatTooltip,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    TranslateModule,
  ],
  templateUrl: './lang-select.component.html',
  styleUrl: './lang-select.component.scss',
})
export class LangSelectComponent {
  @Output()
  languageChanged: EventEmitter<Language> = new EventEmitter<Language>()

  userSelectedLanguage: Language
  selectedLanguage = {
    UZ_CYR: 'Ўзбекча',
    UZ_LAT: "O'zbekcha",
    RU: 'Русский',
    EN: 'English',
  }
  protected readonly Languages = Language

  constructor(
    private translateService: TranslateService,
  ) {
    this.userSelectedLanguage =
      (localStorage.getItem('lang') as Language) || Language.UZ_CYR
    localStorage.setItem('lang', this.userSelectedLanguage)
  }

  changeLanguage(lang: Language) {
    this.userSelectedLanguage = lang
    localStorage.setItem('lang', lang)
    this.translateService.use(lang)
  }
}
