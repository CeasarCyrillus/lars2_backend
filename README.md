## L.A.R.S

## Overview

### The Good
**1. [Generic approach for data fetching](src/data/repository/util.ts)**

The approach for fetching data from the DB and returning it to the FE is created with reusability as the main goal.
Any new data sources can be easily added with included sorting / filtering / pagination on the DB level,
without having any SQL injection threats.

Currently, it's only used for [ReportRepository](src/data/repository/ReportRepository.ts)


**2. [Default functions for responses](src/lib/response.ts)**

Having these two utility functions helps with keeping the messages to the FE consistent, and having a single source of truth for how messages look.

There's some improvement that can be done here, using a middleware is a better approach. Moving the construction of the functions one level up, and passing the partially applied function into the handler would be nicer too, to avoid repetition

**3. Shared types**

Types are shared between the FE and BE, so every possible message is known at compile time.
It would be better as a separate library or as a part of a monorepo

**4. [Seed data](src/data/scripts/seedData.ts)**

It's very convenient to be able to seed the DB with faked values to test performance and during development.

The code that's responsible for it is absolutely awful and barely readable though

**5. Automapper**

Using automapper to map entities directly to DTO's was a blast to use, no more repetitive mapper functions

**6. Using websockets**

I wanted to experiment with socketIO to use websockets for communication between FE/BE. It was not really necessary for this project but it was fun to experiment with

### The Bad
- The authorization is explicit in every message handler, this should be moved to a middleware
- Shared types should be in a separate repo, or the full stack in a monorepo 
- No env variables for configuration
- No automated tests
- The data model is very strange, when I lost interest in this project I was in the middle of refactoring it
- No CI/CD, no dockerization
- I rolled my own password / auth management, it would be better to rely on a 3rd party service. I'm using bcrypt to hash passwords, but it's not best practice to "roll your own" password/auth management

### Local Development
**Prerequisites:**
- Postgresql installed and running
- yarn installed

1. Install packages `yarn install`
2. Make a copy of `config.production.json` and name it `config.development.json`
3. Replace config values with your db login
4. Run `yarn seedData` to seed the db with fake values
5. Run `yarn start` to run the backend locally