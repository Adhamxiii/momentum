# Momentum

A modern, full-stack task management application built with Next.js and MongoDB. Create, organize, and track your tasks with an intuitive interface and real-time status updates.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Live Demo](#live-demo)
- [Contact Me](#contact-me)

## Overview

**Momentum** is a personal task board that helps you stay productive by managing tasks across three workflow stages: **In Progress**, **Under Review**, and **Done**. The app provides a clean, mobile-friendly UI powered by [shadcn/ui](https://ui.shadcn.com/) and persists all data in [MongoDB Atlas](https://www.mongodb.com/atlas) via REST API routes.

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| UI | shadcn/ui, Radix UI, Lucide Icons, Sonner |
| Backend | Next.js API Routes, Mongoose |
| Database | MongoDB Atlas |

## Features

- **Task CRUD** — Create, read, update, and delete tasks with title, description, and status
- **Status workflow** — Move tasks between *In Progress*, *Under Review*, and *Done* directly from the task card
- **Smart filtering** — Filter tasks by status with live counts for each category
- **Task dialog** — Add or edit tasks in a modal with form validation
- **Toast notifications** — Instant feedback on success and error states
- **Responsive layout** — Optimized for desktop and mobile with a floating action button for quick task creation
- **REST API** — Full backend at `/api/tasks` and `/api/tasks/[id]` for all operations
- **MongoDB persistence** — Tasks stored in MongoDB with Mongoose schemas and timestamps

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [npm](https://www.npmjs.com/) (or yarn / pnpm / bun)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Adhamxiii/momentum.git
   cd momentum
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/momentum?retryWrites=true&w=majority
   ```

   Replace `<username>`, `<password>`, and `<cluster>` with your Atlas credentials.

4. **Allow network access in MongoDB Atlas**

   - Go to **Network Access** in your Atlas project
   - Add your current IP address (or `0.0.0.0/0` for development only)
   - Ensure your database user has read/write permissions

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |

## Usage

### Managing Tasks

1. **Create a task** — Click the **+** button in the bottom-right corner, fill in the title and description, choose a status, and save.
2. **View tasks** — All tasks appear in a responsive grid on the home page.
3. **Filter tasks** — Use the filter bar to show *All*, *In Progress*, *Under Review*, or *Done* tasks. Counts update automatically.
4. **Update status** — Click a status badge on any task card to cycle through available next states.
5. **Edit a task** — Click a task card to open the edit dialog, make changes, and save.
6. **Delete a task** — Open a task in the dialog and use the delete option.

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Fetch all tasks (sorted by newest first) |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/[id]` | Update a task by ID |
| `DELETE` | `/api/tasks/[id]` | Delete a task by ID |


## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please keep pull requests focused and ensure the project builds and lints cleanly before submitting.

## Live Demo

> **Coming soon** — The app is not deployed yet. Once live, the demo link will be added here.

You can run the app locally by following the [Installation](#installation) steps above. For deployment, consider [Vercel](https://vercel.com) or [Render](https://render.com) with your `MONGO_URI` set as an environment variable.

## Contact Me

**Adham**

- GitHub: [@Adhamxiii](https://github.com/Adhamxiii)
- Email: [adhamxiii22@gmail.com](mailto:adhamxiii22@gmail.com)

Feel free to reach out for questions, feedback, or collaboration opportunities.

---