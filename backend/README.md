
# Setup Testing Environment

1. pull docker image with ```docker pull postgres```
2. run docker conainer with ```docker run --name gib-postgres-dev -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres```
3. populate with test data with ```node create_test_data.js```
4. run express server with ```npm start```
5. run test charlie site with ```cd test; python3 -m http.server```

# Environment variables
you can use the following enviroment variables to configure the server for production

```GIB_REDEMPTION_BASE_URL``` set as the protocol domain and port of the gib backend server (eg. https://gib.com)
```GIB_POSTGRES_URI``` set as the URI of the postgres server. See
https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING for details

# Production Setup
To setup production see the PRODUCTION.md document
