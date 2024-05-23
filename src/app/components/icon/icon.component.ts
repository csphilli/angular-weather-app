import { Component, Input, OnChanges } from '@angular/core';
import { IconService } from '../../services/icon/icon.service';
import { SafeHtml } from '@angular/platform-browser';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent implements OnChanges{
  @Input() iconName!: string
  icon: SafeHtml | null = null
  iconClass: string | null = null

  constructor(private iconService: IconService) {}

  ngOnChanges(): void {
    if (this.iconName) {
      this.icon = this.iconService.getIcon(this.iconName)
      this.iconClass = `${this.iconName}-icon icon`
    }
  }
}
