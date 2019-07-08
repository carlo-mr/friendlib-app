#!/bin/bash

# function to make a commit on a branch in CI build
# taken from: https://gist.github.com/ddgenome/f3a60fe4c2af0cbe758556d982fbeea9

function branch-commit-push() {
    local sourceBranch=${BUILD_SOURCEBRANCH//refs\/heads\//}
    msg "branch ${sourceBranch}"

    if [[ $sourceBranch != master ]]; then
        msg "not pushing updates to branch $sourceBranch"
        return 0
    fi

    msg "git checkout $sourceBranch"
    if ! git checkout $sourceBranch; then
        err "failed to checkout $sourceBranch"
        return 1
    fi

    msg "git add config.xml"
    if ! git add config.xml; then
        err "failed to add config.xml file to git index"
        return 1
    fi
    
    msg "git commit -m '[skip ci] Increase buildnumber'"
    if ! git commit -m "[skip ci] Increase buildnumber"; then
        err "failed to commit updates"
        return 1
    fi
    
    local git_tag=CI_BUILD-$BUILD_BUILDNUMBER
    if ! git tag "$git_tag" -m "Generated tag from CI build $BUILD_BUILDNUMBER"; then
        err "failed to create git tag: $git_tag"
        return 1
    fi
    
    local remote=origin
    if [[ $GITHUB_TOKEN ]]; then
        remote=https://$GITHUB_TOKEN@github.com/$REPO_SLUG
    fi
    
    msg "git push --quiet --follow-tags $remote $sourceBranch"
    if ! git push --quiet --follow-tags "$remote" "$sourceBranch" > /dev/null 2>&1; then
        err "failed to push git changes"
        return 1
    fi
}

function msg() {
    echo "commit-push: $*"
}

function err() {
    msg "$*" 1>&2
}

branch-commit-push
