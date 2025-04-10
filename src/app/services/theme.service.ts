import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'preferred-theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';

  isDarkMode = signal(this.getInitialTheme());

  constructor() {
    // Initially set the theme class on the document
    this.applyTheme(this.isDarkMode());
  }

  toggleTheme(): void {
    const newThemeValue = !this.isDarkMode();
    this.isDarkMode.set(newThemeValue);
    this.applyTheme(newThemeValue);
    this.saveThemePreference(newThemeValue);
  }

  private getInitialTheme(): boolean {
    // Check for saved preference
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme === this.DARK_THEME) return true;
    if (savedTheme === this.LIGHT_THEME) return false;

    // Otherwise check user's system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private saveThemePreference(isDark: boolean): void {
    localStorage.setItem(
      this.THEME_KEY,
      isDark ? this.DARK_THEME : this.LIGHT_THEME
    );
  }
}
