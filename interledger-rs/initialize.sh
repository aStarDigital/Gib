#! /bin/bash 


# Insert accounts on Node A
# One account represents Alice and the other represents Node B's account with Node A

printf "Creating Alice's account ...\n"
./bin/ilp-cli accounts create alice \
    --asset-code ABC \
    --auth admin-a \
    --asset-scale 9 \
    --ilp-over-http-incoming-token alice-password

printf "Creating charlie's account ...\n"
./bin/ilp-cli accounts create charlie \
    --asset-code ABC \
    --auth admin-a \
    --asset-scale 9 \
    --ilp-over-http-incoming-token charlie-password
