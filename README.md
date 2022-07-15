node_modules
.env
package-lock.json
yarn-error.log
yarn.lock

# Project Campus

repository for the backend framework of the project campus

## set up

notice the [env.sample:](https://github.com/kodecampteam/project-campus-central-backend/blob/development/.env.sample) this is to show you the env variable being used.. so if you need to add a new env value please endevour to update the file

##Contribution
detailed steps on contributing

### branch names

your branch name must start with the following prefixes

- feature/
  - feature is used for new features so for example feature/user_model_and_authentication
    so notice at the other end that i have a well defined description of what feature i'm implementing
- patch/
  - patch is used for patches or edits to features you'll mostly use this one so for example patch/adding_key_to_user_model
    so notice at the other end that i have a well defined description of what patch is being implementing
- hotfix/
  - hotfix is used for strictly fixes for example hotfix/userAuthenication_failing
    so notice at the other end that i have a well defined description of what bug is being fixed

### pull request

note that all pull requests should be linked to an issue that way everybody knows what you are working on .. especially if its a patch or feature
you may be exempted in hotfix but that's only during emergencies

characteristics of a valid pull requests

- a pull have a valid branch naming scheme...
- a pull request must have a reviewer... so it must be approved before being merged
- a pull request should be linked with an issue especiallt patch and feature ....

example of how to link a pull request to and issue
so github has these keywords for pull request issues
the most used in my personal opinon are the

- fixes
- closes

so example of using either.
side-note this are to be writing in your pr description:

- fixes #34
- closes #34
- resolves #34

note the #34 is just the issue number . as soon as you write # github automatically shows you all the issues so you could pick from dere

# HAPPY CODING
