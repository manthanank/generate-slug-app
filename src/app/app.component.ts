import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrackService } from './services/track.service';
import { ThemeService } from './services/theme.service';
import { Meta } from '@angular/platform-browser';
import { Visit } from './models/visit.model';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly title = 'generate-slug-app';
  slugForm: FormGroup;

  blogTitle = signal('');
  slug = computed(() => this.generateSlug(this.blogTitle()));
  showCopyMessage = signal(false);
  visitorCount = signal(0);

  currentYear = new Date().getFullYear();

  getBlogTitleLength = computed(() => {
    const title = this.blogTitle();
    return title ? title.length : 0;
  });

  private trackService = inject(TrackService);
  private meta = inject(Meta);
  private fb = inject(FormBuilder);
  themeService = inject(ThemeService);

  private formSubscription: Subscription | undefined;

  constructor() {
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

    this.formSubscription = this.slugForm
      .get('title')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.blogTitle.set(value || '');
      });
  }

  ngOnInit(): void {
    this.trackProjectVisit();
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private trackProjectVisit(): void {
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
    this.slugForm.reset();
    this.showCopyMessage.set(false);
  }
}
