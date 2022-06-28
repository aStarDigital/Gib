#! /bin/bash 

for port in 6379 6380; do
    if lsof -Pi :${port} -sTCP:LISTEN -t >/dev/null ; then
        redis-cli -p ${port} shutdown
    fi
done

if [ -f dump.rdb ] ; then
    rm -f dump.rdb
fi

for port in 8545 7770 8770; do
    if lsof -tPi :${port} >/dev/null ; then
        kill `lsof -tPi :${port}` > /dev/null
    fi
done
