#! /bin/bash 

printf "\nAlice's balance: "
./bin/ilp-cli accounts balance alice --auth admin-a 

printf "\nBobs's balance: "
./bin/ilp-cli accounts balance bob --auth admin-a 
