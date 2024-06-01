import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = '';
  slug: string = '';
  showCopyMessage: boolean = false;

  generateSlug() {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  copySlug() {
    const textarea = document.createElement('textarea');
    textarea.value = this.slug;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.showCopyMessage = true;
    setTimeout(() => {
      this.showCopyMessage = false;
    }, 2000); // Hide the message after 2 seconds
  }

  clearInputs() {
    this.title = '';
    this.slug = '';
    this.showCopyMessage = false;
  }
}
