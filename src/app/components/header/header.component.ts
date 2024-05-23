import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title: string = "Today's Weather";
}
