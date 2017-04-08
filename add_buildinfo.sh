#!/usr/bin/env bash

GIT_COMMIT=$(git log --pretty=format:'%H' -n 1)
BUILD_DATE=$(TZ=":UTC" date)
echo "{\"git_commit\": \"$GIT_COMMIT\", \"travis_build\": \"$TRAVIS_BUILD_ID\", \"date\": \"$BUILD_DATE\"}" > public/build.json
