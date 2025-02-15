

## About this repository

This repository is a Nextjs app. 
 
#### Tech stack used
-  Nextjs 15.
- Tailwind CSS .
- Zustand for global state management.
- Typescript.

## Project Structure

This repository is structured as follows:
```
kanbanBoard
├── src
│   ├── app
│   │   ├── _components  # Common components for each page
│   │   ├── ... (Next.js routes)
│   ├── components
│   │   ├── ui  # Reusable UI components (Card, Modal, etc.) for consistency
│   │   ├── Navbar.tsx  # Main Navbar component
│   ├── data  # Fake user data for testing
│   ├── hooks  # Custom hooks for the application
│   ├── lib  # Utility functions like Tailwind merge (cn function)
│   ├── providers  # Context and provider components
│   ├── store  # Zustand store for state management
│   ├── types  # Type definitions used throughout the app
│   ├── utils  # Utility functions used across the app
│
├── public
│   ├── images  # Static images
```

## Folder Descriptions

### `app/`
Contains Next.js routes. Each route may have an `_components/` folder for common components specific to that page.

### `components/`
Holds reusable components like the `Navbar` and a `ui/` folder for shared UI elements such as modals and cards, ensuring design consistency.

### `data/`
Includes mock user data for testing purposes.

### `hooks/`
Custom React hooks that encapsulate reusable logic.

### `lib/`
Utility functions such as `cn` (Tailwind merge helper) and other commonly used functions.

### `providers/`
Contains global providers like authentication, theme, or state management providers.

### `store/`
Manages application state using Zustand.

### `types/`
Defines TypeScript types used throughout the application.

### `utils/`
Utility functions used across the app to keep the codebase clean and reusable.

### `public/images/`
Contains static image assets.

---


## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/kanban-board.git
```

### Navigate to project directory

```bash
cd kanaban-board
```

```bash
npm i
```

```bash
npm run dev
```


## Commit Convention
| Type     | Description                                        | Example                                               |
|----------|----------------------------------------------------|-------------------------------------------------------|
| feat     | New feature                                        | feat: add drag and drop functionality                  |
| fix      | Bug fixes                                          | fix: resolve column overflow issue                     |
| refactor | Code changes that neither fix bugs nor add features| refactor: restructure task card component             |
| style    | Changes that don't affect code meaning             | style: adjust dark theme colors                       |
| chore    | Other changes that don't modify src or test files  | chore: update package.json dependencies               |
| docs     | Documentation only changes                         | docs: add comments to task interface                  |
| test     | Adding missing tests or correcting existing tests  | test: add unit tests for task card                   |
| perf     | Code changes that improve performance              | perf: optimize task list rendering                    |
