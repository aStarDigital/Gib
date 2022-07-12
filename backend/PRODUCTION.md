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
5. Run the backend docker container
```
    docker run -e \
        GIB_POSTGRES_URI=postgres://<postgres_username>:<postgres_password>@host.docker.internal:<postgres_port> \
        -e GIB_REDEMPTION_BASE_URL=<current_server_url> \
        --add-host=host.docker.internal:host-gateway \
        -p <local port>:4000 \
        -d \
        --name gibbackend_production \
        gibbackend
```
6. Setup Redis
```
docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
```
7. install ilp-cli tools
```
 curl -L https://github.com/interledger-rs/interledger-rs/releases/download/ilp-cli-latest/ilp-cli-x86_64-unknown-linux-musl.tar.gz | tar xzv
 ```
8. install ilp-node tools
```
    curl -L https://github.com/interledger-rs/interledger-rs/releases/download/ilp-node-latest/ilp-node-x86_64-unknown-linux-musl.tar.gz | tar xzv
```

9. Setup interledger rs instance
```
 ./ilp-node \
--ilp_address example.node_a \
--secret_seed 8852500887504328225458511465394229327394647958135038836332350604 \
--admin_auth_token admin-a \
--redis_url redis://127.0.0.1:6379/ \
--http_bind_address 127.0.0.1:7770 \
--settlement_api_bind_address 127.0.0.1:7771 &
```


10. setup  accounts for alice
```
./ilp-cli \
accounts create alice \
--asset-code ABC \
--auth admin-a \
--asset-scale 9 \
--ilp-over-http-incoming-token alice-password
```

11. setup account for charlie
```
./ilp-cli accounts create charlie \
    --asset-code ABC \
    --auth admin-a \
    --asset-scale 9 \
    --ilp-over-http-incoming-token charlie-password
```


## Debugging
- to get logs from the container run ```docker logs gibbackend_production```
- to tail the logs run ```docker logs -f gibbackend_production ```
- to see what containers are running run ```docker ps```

## Interledger RS setup




# Also write this line in .bash_profile etc if needed
- download interledger-rs

```
pushd ~/.interledger/bin &>/dev/null

# install ilp-node
if [ ! -e "ilp-node" ]; then
    curl -L https://github.com/interledger-rs/interledger-rs/releases/download/ilp-node-latest/ilp-node-x86_64-apple-darwin.tar.gz | tar xzv -
fi

# install ilp-cli
if [ ! -e "ilp-cli" ]; then
    curl -L https://github.com/interledger-rs/interledger-rs/releases/download/ilp-cli-latest/ilp-cli-x86_64-apple-darwin.tar.gz | tar xzv -
fi

popd &>/dev/null

```

- launch the node and rembember the <auth token>
```
./ilp-node \
--secret_seed 8852500887504328225458511465394229327394647958135038836332350604 \
--admin_auth_token admin-a \
--redis_url redis://127.0.0.1:6379/  \
--http_bind_address 127.0.0.1:7770
```

