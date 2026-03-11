# Portion Calculator

When cooking for multiple days and/or people, it's often hard to split used ingredients for each portion, especially when portions are not the same size. This app makes it fast.

## Goal of the repository

The main goal of this repository is to learn how to create and publish an iOS/Android app.

## Tech stack

- Vue 3 + TypeScript
- Pinia (persisted to localStorage — no backend)
- vue-i18n
- SCSS
- Vite
- Docker (dev environment)

## Running locally

### Prerequisites

- Docker and Docker Compose

### Steps

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
   Adjust `USER_UID` and `USER_GID` to match your local user if needed (`id -u` / `id -g`).

2. Start the dev server:
   ```bash
   make dev
   ```

3. Open http://localhost:80 in your browser.

## License

This project is licensed under the GNU General Public License v3.0 — see the [LICENSE](LICENSE) file for details.
