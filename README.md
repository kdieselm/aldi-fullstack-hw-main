# Fullstack Monitoring — Interview Exercise

This repository contains two independent parts of the exercise. Each has its
own task list — start there:

- **Backend (Spring Boot / Java):** [`backend/TASKS.md`](backend/TASKS.md)
- **Frontend:** [`frontend/TASK.md`](frontend/TASK.md)

Read the task file for the part you're working on first; it explains the
setup steps, requirements, and how your work will be verified (e.g. which
test classes to run).

## Frontend: React and Angular

`frontend/TASK.md` asks for an Angular dashboard, but based on our email exchange the frontend
had to be built in React. To cover both, I implemented the same dashboard twice:

- **React (the requested version):** [`frontend/react-dashboard/README.md`](frontend/react-dashboard/README.md)
- **Angular (per `frontend/TASK.md`):** [`frontend/iot-dashboard/README.md`](frontend/iot-dashboard/README.md)

Both have the same pages, layering and tests. Each README covers how to run the app, design
decisions and assumptions about the backend API.
