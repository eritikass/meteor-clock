#!/usr/bin/env bash

BUILD_GITREV=$(git log --pretty=format:'%H' -n 1)
echo "{\"commit\": \"$BUILD_GITREV\", \"travis_build\": \"$TRAVIS_BUILD_ID\"}" > public/git.json

meteor build --directory meteor_build

docker build -t eritikass/meteor-clock .
docker push eritikass/meteor-clock

# cleanup
rm -fr meteor_build