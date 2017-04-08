#!/usr/bin/env bash

GIT_COMMIT=$(git log --pretty=format:'%H' -n 1)
GIT_BRANCH=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
BUILD_DATE=$(TZ=":UTC" date)
echo "{\"git\": {\"commit\": \"$GIT_COMMIT\", \"branch\": \"$GIT_BRANCH\"}, \"travis_build\": \"$TRAVIS_BUILD_ID\",  \"date\": \"$BUILD_DATE\"}" > public/build.json
