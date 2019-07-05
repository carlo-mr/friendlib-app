#!/bin/bash
# function to make a commit on a branch in a Travis CI build
# taken from: https://gist.github.com/ddgenome/f3a60fe4c2af0cbe758556d982fbeea9
# be sure to avoid creating a Travis CI fork bomb
# see https://github.com/travis-ci/travis-ci/issues/1701

function travis-branch-commit() {
    if ! git checkout "$BUILD_SOURCEBRANCH"; then
        err "failed to checkout $BUILD_SOURCEBRANCH"
        return 1
    fi

    if ! git add config.xml; then
        err "failed to add modified files to git index"
        return 1
    fi
    # make CI skip this build
    if ! git commit -m "[skip ci] Buildnumber update"; then
        err "failed to commit updates"
        return 1
    fi
    # add to your .travis.yml: `branches\n  except:\n  - "/\\+travis\\d+$/"\n`
    #local git_tag=CI_BUILD+$BUILD_BUILDNUMBER
    #if ! git tag "$git_tag" -m "Generated tag from CI build $BUILD_BUILDNUMBER"; then
    #    err "failed to create git tag: $git_tag"
    #    return 1
    #fi
    local remote=origin
    if [[ $GITHUB_TOKEN ]]; then
        remote=https://$GITHUB_TOKEN@github.com/$REPO_SLUG
    fi
    #if [[ $BUILD_SOURCEBRANCH != master ]]; then
    #    msg "not pushing updates to branch $BUILD_SOURCEBRANCH"
    #    return 0
    #fi
    if ! git push --quiet --follow-tags "$remote" "$BUILD_SOURCEBRANCH" > /dev/null 2>&1; then
        err "failed to push git changes"
        return 1
    fi
}

function msg() {
    echo "travis-commit: $*"
}

function err() {
    msg "$*" 1>&2
}

travis-branch-commit
