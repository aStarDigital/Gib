
#! /bin/bash 

export RUST_LOG=interledger=debug

echo "please start a redis server on port 6380 and 6379"

./bin/ilp-node \
--ilp_address example.node_a \
--secret_seed 8852500887504328225458511465394229327394647958135038836332350604 \
--admin_auth_token admin-a \
--redis_url redis://127.0.0.1:6379/ \
--http_bind_address 127.0.0.1:7770 \
--settlement_api_bind_address 127.0.0.1:7771 
