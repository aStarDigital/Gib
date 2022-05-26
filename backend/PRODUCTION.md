# Production setup

This file covers the needed steps to run the backend express server on production

## Prerequisites

- You should have a Ubunutu machine running with a publicly accessible static IP
- You have a postgresql instance running on the same Ubunut machine with a username and password
  set. This should be accessible via localhost on a designated port.
- You should have docker available on the machine
- You should have a server handling ssl/https

## Steps

1. Checkout the current head branch of [Gib](https://github.com/aStarDigital/Gib)
2. cd into the "backend" dir with ```cd backend``` . 
3. Build the docker image and assign it a name with ```docker build --tag gibbackend ./```
4. Gather all of the variables you will need to run the container
    in this context we need to know:
    - <local port> : This is the port the server will attach to on localhost. The ssl/https server
        should route to this <local port> after handling ssl encryption.
    - <postgres_port> : This is the port that postgresql is running on the local machine.
    - <postgres_password> : The password for the postgresql server
    - <postgres_username> : The username for the postgresql server
    - <current_server_url> : This is the address of the machine. With DNS will look something like 
      ```gib.gives```. Without DNS this will look something like ```45.79.159.178```
5. Run the docker container
```
    docker run -e \
        GIB_POSTGRES_URI=postgres://<postgres_username>:<postgres_password>@host.docker.internal:<postgres_port> \
        GIB_REDEMPTION_BASE_URL=<current_server_url> \
        --add-host=host.docker.internal:host-gateway \
        -p 4000:<current_server_url> \
        gibbackend




