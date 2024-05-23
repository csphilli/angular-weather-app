import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  sanitizeHtml(value: string): string {
    const cleaned = this.sanitizer.sanitize(SecurityContext.HTML, value)
    if (cleaned !== null){
      return cleaned
    } else {
      return ""
    }
  }

  constructor(private sanitizer: DomSanitizer) { }
}
