#!/bin/bash

git add -A
git commit -m "Boxercopter.com deploy at `eval date +%Y-%m-%d"\ "%H:%M`"
git pull --rebase
git checkout gh-pages
git rebase master
git push origin gh-pages
git checkout master
