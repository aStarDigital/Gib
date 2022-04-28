
#Setup Testing Environment

1. pull docker image with ```docker pull postgres```
2. run docker conainer with ```docker run --name gib-postgres-dev -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres```
3. populate with test data with ```node create_test_data.js```
4. run express server with ```npm start```
5. run test charlie site with ```cd test; python3 -m http.server```
