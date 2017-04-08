#!/usr/bin/env bash

./add_buildinfo.sh

meteor build --directory meteor_build

docker build -t eritikass/meteor-clock .
docker push eritikass/meteor-clock

# cleanup
rm -fr meteor_build