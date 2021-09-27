# Azure DevOps Reporting

## Usage

Set the environment file:

    cp .env.example .env

Start the PostgreSQL instance:

    docker-compose up

Use Prisma to set up the database:

    npx prisma migrate deploy

View the data in a Web interface:

http://localhost:8080
