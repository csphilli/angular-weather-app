import { Injectable } from '@angular/core';
import { Icons } from '../../composables/icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class IconService {

  getIcon(iconName: string): SafeHtml {
    const icon = Icons[iconName]
    return this.sanitizer.bypassSecurityTrustHtml(icon)
  }

  constructor(private sanitizer: DomSanitizer) { }
}
