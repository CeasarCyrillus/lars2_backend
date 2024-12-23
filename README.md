## L.A.R.S

### Local Development
**Prerequisites:**
- Postgresql installed and running
- yarn installed

1. Install packages `yarn install`
2. Make a copy of `config.production.json` and name it `config.development.json`
3. Replace config values with your db login
4. Run `yarn seedData` to seed the db with fake values
5. Run `yarn start` to run the backend locally