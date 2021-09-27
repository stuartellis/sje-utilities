# Azure DevOps Reporting

## Usage

Set up the dependencies:

    npm install

Set the environment file:

    cp .env.example .env

Start the PostgreSQL instance:

    docker-compose up

Use Prisma to set up the database:

    npx prisma migrate deploy

Run the data import process:

    node ./index.js

To view the data in a Web interface, go to this URL in a browser:

http://localhost:8080

Enter these settings on the login page:

- System: PostgreSQL
- Server: db
- Username: postgres
- Password: <Use value from POSTGRES_PASSWORD environment variable>
- Database: adorpt
