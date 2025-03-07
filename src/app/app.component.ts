import { Component, inject, signal, computed } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrackService } from './services/track.service';
import { Meta } from '@angular/platform-browser';
import { Visit } from './models/visit.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private title = 'generate-slug-app';
  slugForm: FormGroup;

  // Signals
  blogTitle = signal('');
  slug = computed(() => this.generateSlug(this.blogTitle()));
  showCopyMessage = signal(false);
  visitorCount = signal(0);

  // Services
  private trackService = inject(TrackService);
  private meta = inject(Meta);
  private fb = inject(FormBuilder);

  constructor() {
    // Basic meta tags
    this.meta.addTags([
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
      {
        name: 'canonical',
        content: 'https://generate-slug-app.vercel.app',
      },
      {
        name: 'author',
        content: 'Manthan Ankolekar',
      },
      {
        name: 'keywords',
        content: 'angular, slug generator',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
    ]);

    // OpenGraph meta tags
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Blog Slug Generator',
      },
      {
        property: 'og:description',
        content:
          'Generate slugs for your blog posts easily with this simple slug generator app built with Angular.',
      },
      {
        property: 'og:url',
        content: 'https://generate-slug-app.vercel.app',
      },
    ]);

    this.slugForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
    // Subscribe to form changes
    this.slugForm.get('title')?.valueChanges.subscribe((value) => {
      this.blogTitle.set(value);
    });
  }

  ngOnInit(): void {
    this.trackService.trackProjectVisit(this.title).subscribe({
      next: (response: Visit) => {
        this.visitorCount.set(response.uniqueVisitors);
      },
      error: (err: Error) => {
        console.error('Failed to track visit:', err);
      },
    });
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async copySlug(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.slug());
      this.showCopyMessage.set(true);
      setTimeout(() => {
        this.showCopyMessage.set(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  clearInputs(): void {
    this.blogTitle.set('');
    this.showCopyMessage.set(false);
  }

  updateBlogTitle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.blogTitle.set(input.value);
  }
}
