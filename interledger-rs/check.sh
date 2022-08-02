#! /bin/bash 

printf "\nAlice's balance: "
./bin/ilp-cli accounts balance alice --auth admin-a 

printf "\nCharlies's balance: "
./bin/ilp-cli accounts balance charlie --auth admin-a 
