# Personal Landing Page

This is my personal landing page showcasing my professional skills, projects, and experience as a web developer.

## Technologies Used

- **Astro**: Static site generator for building fast, content-focused websites
- **Yandex Cloud**: Cloud infrastructure for deployment

## Project Structure

The project follows a standard Astro structure with:

- `src/pages/index.astro` - Main landing page
- `src/components/` - Reusable UI components
  - `FirstScreen` - Initial section with personal information
  - `Portfolio` - Projects showcase section
- `.github/workflows/deploy.yml` - GitHub Actions CI/CD pipeline

## Deployment Process

The site is automatically deployed to Yandex Cloud when pushing to a tagged commit:

1. Build the site using Astro
2. Create a temporary bucket in Yandex Object Storage
3. Update API Gateway to point to the new bucket
4. Clean up previous version of the bucket

## Development Setup

To run the project locally:

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm run build`
