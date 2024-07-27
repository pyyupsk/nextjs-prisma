# Next.js and Prisma ORM

This is a simple task manager application built using Next.js and Prisma ORM. The app allows users to create, update, and delete task items, providing a straightforward interface for task management.

## Table of Contents

- [Next.js and Prisma ORM](#nextjs-and-prisma-orm)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [License](#license)
  - [Contact](#contact)
  - [Acknowledgements](#acknowledgements)

## Features

-   Add new task
-   Mark task as completed
-   Edit existing task
-   Delete task

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Database:** SQLite (default) or any other supported database

## Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/pyyupsk/nextjs-prisma.git
    cd nextjs-prisma
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up the database**

    Create a `.env` file in the root directory and add your database URL. For example, you can use the following:

    ```env
    DATABASE_URL=YOUR_DATABASE_URL
    ```

4. **Migrate the database**

    ```bash
    npx prisma migrate dev --name init
    ```

5. **Generate the Prisma Client**

    ```bash
    npx prisma generate
    ```

6. **Start the development server**

    ```bash
    npm run dev
    ```

    The app will be available at [http://localhost:3000](http://localhost:3000).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! If you have any questions or feedback, feel free to open an issue or reach out.

---

## Contact

-   GitHub: [pyyupsk](https://github.com/pyyupsk)
-   Email: pyyupsk@proton.me

---

## Acknowledgements

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Prisma Documentation](https://www.prisma.io/docs)

---
