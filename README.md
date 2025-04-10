# Blog Slug Generator

A simple web application built with Angular that generates SEO-friendly URL slugs from blog post titles.

## Features

- Real-time slug generation as you type
- Dark and light theme support with user preference persistence
- Converts titles to lowercase
- Replaces spaces and special characters with hyphens
- Removes leading and trailing hyphens
- One-click copy to clipboard functionality
- Visitor tracking with real-time counter
- Form validation with helpful error messages
- Fully responsive design with Tailwind CSS
- Accessible UI with ARIA labels and semantic HTML

## Tech Stack

- Angular 19.2.0
- TypeScript 5.7.2
- Tailwind CSS 4.0.12
- RxJS 7.8.0

## Development Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/manthanank/generate-slug-app.git
    cd generate-slug-app
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start development server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:4200`

## Build

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/generate-slug-app` directory.

## Testing

Run unit tests with:

```bash
npm test
```

## Project Structure

```text
generate-slug-app/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── visit.model.ts
│   │   ├── services/
│   │   │   ├── theme.service.ts
│   │   │   └── track.service.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── public/
│   ├── favicon.ico
│   └── site.webmanifest
└── package.json
```

## License

This project is licensed under the MIT License.
