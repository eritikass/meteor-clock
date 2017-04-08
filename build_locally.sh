#!/usr/bin/env bash

meteor build --directory meteor_build

docker build -t eritikass/meteor-clock .
docker push eritikass/meteor-clock

# cleanup
rm -fr meteor_build