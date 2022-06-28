#! /bin/bash 

# Sending payment of 500 from Alice (on Node A) to Bob (on Node B)
./bin/ilp-cli pay alice \
    --auth alice-password \
    --amount 500 \
    --to http://localhost:7770/accounts/bob/spsp
