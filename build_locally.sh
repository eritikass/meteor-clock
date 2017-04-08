#!/usr/bin/env bash

./add_buildinfo.sh

GIT_BRANCH=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)

meteor build --directory meteor_build

docker build -t eritikass/meteor-clock:$GIT_BRANCH .
docker push eritikass/meteor-clock:$GIT_BRANCH

docker tag eritikass/meteor-clock:$GIT_BRANCH eritikass/meteor-clock:latest
docker push eritikass/meteor-clock:latest

# cleanup
rm -fr meteor_build