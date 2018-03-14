GIT WORKFLOW

1. Fork master branch from https://github.com/DoNotErase/GoalSquad
2. clone your fork to your local machine
3. set upstream to https://github.com/DoNotErase/GoalSquad
4. make changes on your master branch
5. 'git pull --rebase upstream master'
  5a. resolve merge conflicts
  5b. 'git add .'
  5c. 'rebase --continue'  || if this isn't working, 'rebase --skip'
  5d. repeat
6. 'git push origin master'
7. create pull request from your fork's master to org's master
8. 'git pull --rebase upstream master' whenever pull requests are completed

