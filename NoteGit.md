[[Github]]
[[Notes/REACT|REACT]]
[[JAVSCRIPT]]
- Git is a version control system.
- Git helps you keep track of code changes.
- Git is used to collaborate on code.

**command to check git version**   :-    git --version 



# steps to create merge branches

`git clone <repository-url>`
`cd <repository-name>`

# Start in the repository
git fetch origin
git checkout main
git pull origin main
git checkout collaborator-branch
git pull origin collaborator-branch
git checkout main
git merge collaborator-branch
# Resolve conflicts if any, then:
git push origin main
# Optionally delete the branch
git branch -d collaborator-branch
git push origin --delete collaborator-branch


# git commands 

---
- git config --global user.name "w3schools-test" 
- git config --global user.email "test@w3schools.com"
---

# local git commands


`git branch checkout <branchName>` -------to checkout branch
`git  switch <branchName>`      -------to checkout branch
`git checkout -b <branchName>`    ----- to create and switch to new branch
`git switch -c <branchName>    -----to create and switch to new branch `
`git branch     ---------to list branch and with name to create branch
`git branch -d <branchName>  -------to delete branch`
`git add  --all or <branchName > ----------to add all branches and onebranch`
`git commit -m "message " ------ use to commit branh`
`git commit -am "message"      ------use to commit and add in single command `
`git commit --amend -m "message "   ------used to commit new canges in previous commit` 
`git remote add origin <url.git>`
`git push -u origin main`
git log
git log --online  -------- to get onliner log
git branch -m < branchName>
git fetch  -------to fetch all branches that are not merged to main
git  merge < branchName > --------- to merge the branch with the main branch
git pull  ------------to take code to local repository 

---

Git and GitHub are different things.
Git is version control and github is remote repository platform
other remote repository platforms   : - bitbucket ,gitlab.

Uses of git
- Tracking code changes
- Tracking who made changes
- Coding collaboration


  What does Git do?

- Manage projects with **Repositories**
- **Clone** a project to work on a local copy
- Control and track changes with **Staging** and **Committing**
- **Branch** and **Merge** to allow for work on different parts and versions of a project
- **Pull** the latest version of the project to a local copy
- **Push** local updates to the main project

---

#  Configure Git
Change the user name and e-mail address to your own. You will probably also want to use this when registering to GitHub later on.
- git config --global user.name "w3schools-test" 
- git config --global user.email "test@w3schools.com"

**Note:** *Use `global` to set the username and e-mail for **every repository** on your computer.*
*If you want to set the username/e-mail for just the current repo, you can remove `global`*


---
# Best Git Branch Naming Convention

Best practices for naming Git branches include:

- **Descriptive and Concise Names**: Branch names should be descriptive enough to convey their purpose but concise to avoid verbosity. For example, `feature/login-form` or `bugfix/451-data-analysis`.234+2
    
- **Use of Category Words**: Start branch names with a category word to indicate the type of task. Common categories include:
    
    - **hotfix**: For quickly fixing critical issues, usually with a temporary solution.
        
    - **bugfix**: For fixing a bug.
        
    - **feature**: For adding, removing, or modifying a feature.
        
    - **test**: For experimenting with something that is not an issue.
        
    - **wip**: For work in progress.234
        
- **Inclusion of Issue IDs**: If your project uses an issue tracking system like Jira or GitHub Issues, include the issue ID in the branch name. For example, `feature/PROJ-123-login-form`.345+1
    
- **Lowercase and Dashes**: Use lowercase letters and dashes instead of spaces to ensure compatibility across different operating systems and Git hosting platforms. For example, `feature/login-form`.456
    
- **Avoid Spaces and Special Characters**: Branch names should not contain spaces or special characters that could cause issues. Use hyphens or underscores for readability.346
    
- **Consistency**: Stick to a consistent naming convention throughout the project to maintain clarity and organization. This helps in automating workflows and makes it easier for team members to understand the purpose of each branch.234+2
    
- **Prefixing with Ticket Numbers**: For larger teams using product management software, start the branch name with the ticket number associated with the task. This ensures branches are easily identifiable and linked to specific tickets. For example, `1234-add-user-authentication`.45
    
- **Avoid Using Bare Numbers**: Do not use bare numbers in branch names to avoid confusion with SHA-1 hashes. For example, use `CR15032-fix-crash` instead of just `15032`.35
    
- **Use Slashes for Grouping**: Use slashes to group related branches. For example, `feature/login-form` and `bugfix/451-data-analysis`.346
    
- **Limit Length**: Keep branch names concise to avoid excessive verbosity. While it's essential to provide enough information for clarity, overly long branch names can become cumbersome.45
    
- **Use of Author Names**: Optionally, include the name of the author to help track shared work. For example, `wip/john-login-form`.23
    

By following these best practices, you can maintain an organized and efficient Git repository, making it easier for team members to collaborate and track changes.

---

## Creating Git Folder

Now, let's create a new folder for our project:

### Example
```shell
mkdir myproject
cd myproject
```

`mkdir` **make**s a **new directory**.
`cd` **changes** the **current working directory**.


**Note:** If you already have a folder/directory you would like to use for Git:
Navigate to it in command line, or open it in your file explorer, right-click and select "Git Bash here"


---
## Initialize Git

Once you have navigated to the correct folder, you can initialize Git on that folder:

### Example
```git
git init 
Initialized empty Git repository in /Users/user/myproject/.git/
```
You just created your first Git Repository!

**Note:** Git now knows that it should watch the folder you initiated it on.
Git creates a hidden folder to keep track of changes.


---
## Git Adding New Files

For this example, I am going to use a simple HTML file like this:
And save it to our new folder as `index.html`.
Let's go back to the terminal and list the files in our current working directory:

### Example

```shell
ls
index.html
```

`ls` will **list** the files in the directory. We can see that `index.html` is there.
Then we check the Git `status` and see if it is a part of our repo:

### Example

```shell
git status
On branch master

No commits yet

Untracked files:
  (use "git add ..." to include in what will be committed)
    index.html

nothing added  to commit but untracked files present (use "git add" to track)
```

Now Git is **aware** of the file, but has not **added** it to our repository!

Files in your Git repository folder can be in one of 2 states:

- Tracked - files that Git knows about and are added to the repository
- Untracked - files that are in your working directory, but not added to the repository

 When you first add files to an empty repository, they are all untracked. To get Git to track them, you need to stage them, or add them to the staging environment.
 
 ---
 
# Git Staging Environment

What are staged files?
==>   **Staged** files are files that are ready to be **committed** to the repository you are working on. You will learn more about `commit` shortly

why staging is important?
==>   One of the core functions of Git is the concepts of the Staging Environment, and the Commit.
As you are working, you may be adding, editing and removing files. But whenever you hit a milestone or finish a part of the work, you should add the files to a Staging Environment.

For now, we are done working with `index.html`. So we can add it to the Staging Environment:
### Example

```shell
git add index.html
```

The file should be **Staged**. Let's check the status::

### Example

```shell
git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached ..." to unstage)
    new file: index.html
```

Now the file has been added to the Staging Environment.

---
## Git Add More than One File

Let's add 2 more files to our working folder.
A `README.md` file that describes the repository (recommended for all repositories):
A basic external style sheet (`bluestyle.css`):
And update `index.html` to include the stylesheet:

Now add all files in the current directory to the Staging Environment:

### Example

```shell
git add --all
```

Using `--all` instead of individual filenames will `stage` all changes (new, modified, and deleted) files.
### Example

```shell
git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached ..." to unstage)
        new file:   README.md
        new file:   bluestyle.css
        new file:   index.html
```

Now all 3 files are added to the Staging Environment, and we are ready to do our first `commit`.

     ----------------------**Note:** The shorthand command for `git add --all` is `git add -A`---------------------


to reset staged files use command      ----    git reset    -----    or another command is  
---  git restore --staged    -------

---- `to unstage git added changes use git rm --cached <file>` ----

---
## Git Commit

Since we have finished our work, we are ready move from `stage` to `commit` for our repo.

**why is commit important and use of commit?**
==>  Adding commits keep track of our progress and changes as we work. Git considers each `commit` change point or "save point". It is a point in the project you can go back to if you find a bug, or want to make a change.

  When we `commit`, we should **always** include a **message**.

  ### Example

```shell
git commit -m "First release of Hello World!"
[master (root-commit) 221ec6e] First release of Hello World!
 3 files changed, 26 insertions(+)
 create mode 100644 README.md
 create mode 100644 bluestyle.css
 create mode 100644 index.html
```

The `commit` command performs a commit, and the `-m "_message_"` adds a message.

Sometimes, when you make small changes, using the staging environment seems like a waste of time. It is possible to commit changes directly, skipping the staging environment. The `-a` option will automatically stage every changed, already tracked file.

And check the status of our repository. But this time, we will use the --short option to see the changes in a more compact way:

### Example

```shell
git status --short
 M index.html
```

**Note:** Short status flags are:

- ?? - Untracked files
- A - Files added to stage
- M - Modified files
- D - Deleted files

We see the file we expected is modified. So let's commit it directly:

### Example

```shell
git commit -a -m "Updated index.html with a new line"
[master 09f4acd] Updated index.html with a new line
 1 file changed, 1 insertion(+)
```
**Warning:** Skipping the Staging Environment is not generally recommended.
Skipping the stage step can sometimes make you include unwanted changes.

---
## Git Commit Log

To view the history of commits for a repository, you can use the `log` command:
### Example

```shell
git log
commit 09f4acd3f8836b7f6fc44ad9e012f82faf861803 (HEAD -> master)
Author: w3schools-test 
Date:   Fri Mar 26 09:35:54 2021 +0100

    Updated index.html with a new line

commit 221ec6e10aeedbfd02b85264087cd9adc18e4b26
Author: w3schools-test 
Date:   Fri Mar 26 09:13:07 2021 +0100

    First release of Hello World!
```

---

## Git Help

If you are having trouble remembering commands or options for commands, you can use Git `help`.

There are a couple of different ways you can use the `help` command in command line:

- `git _command_ -help` -  See all the available options for the specific command
- `git help --all` -  See all possible commands

Any time you need some help remembering the specific option for a command, you can use `git _command_ -help`:

 can use `git _command_ -help`:
### Example

```shell
git commit -help
usage: git commit [] [--] ...

    -q, --quiet           suppress summary after successful commit
    -v, --verbose         show diff in commit message template

Commit message options
    -F, --file      read message from file
    --author      override author for commit
    --date          override date for commit
    -m, --message 
                          commit message
    -c, --reedit-message 
                          reuse and edit message from specified commit
    -C, --reuse-message 
                          reuse message from specified commit
    --fixup       use autosquash formatted message to fixup specified commit
    --squash      use autosquash formatted message to squash specified commit
    --reset-author        the commit is authored by me now (used with -C/-c/--amend)
    -s, --signoff         add a Signed-off-by trailer
    -t, --template 
                          use specified template file
    -e, --edit            force edit of commit
    --cleanup       how to strip spaces and #comments from message
    --status              include status in commit message template
    -S, --gpg-sign[=]
                          GPG sign commit

Commit contents options
    -a, --all             commit all changed files
    -i, --include         add specified files to index for commit
    --interactive         interactively add files
    -p, --patch           interactively add changes
    -o, --only            commit only specified files
    -n, --no-verify       bypass pre-commit and commit-msg hooks
    --dry-run             show what would be committed
    --short               show status concisely
    --branch              show branch information
    --ahead-behind        compute full ahead/behind values
    --porcelain           machine-readable output
    --long                show status in long format (default)
    -z, --null            terminate entries with NUL
    --amend               amend previous commit
    --no-post-rewrite     bypass post-rewrite hook
    -u, --untracked-files[=]
                          show untracked files, optional modes: all, normal, no. (Default: all)
    --pathspec-from-file 
                          read pathspec from file
    --pathspec-file-nul   with --pathspec-from-file, pathspec elements are separated with NUL character
```

**Note:** You can also use `--help` instead of `-help` to open the relevant Git manual page

To list all possible commands, use the `help --all` command:
### Example

```shell
$ git help --all
See 'git help ' to read about a specific subcommand

Main Porcelain Commands
   add                  Add file contents to the index
   am                   Apply a series of patches from a mailbox
   archive              Create an archive of files from a named tree
   bisect               Use binary search to find the commit that introduced a bug
   branch               List, create, or delete branches
   bundle               Move objects and refs by archive
   checkout             Switch branches or restore working tree files
   cherry-pick          Apply the changes introduced by some existing commits
   citool               Graphical alternative to git-commit
   clean                Remove untracked files from the working tree
   clone                Clone a repository into a new directory
   commit               Record changes to the repository
   describe             Give an object a human readable name based on an available ref
   diff                 Show changes between commits, commit and working tree, etc
   fetch                Download objects and refs from another repository
   format-patch         Prepare patches for e-mail submission
   gc                   Cleanup unnecessary files and optimize the local repository
   gitk                 The Git repository browser
   grep                 Print lines matching a pattern
   gui                  A portable graphical interface to Git
   init                 Create an empty Git repository or reinitialize an existing one
   log                  Show commit logs
   maintenance          Run tasks to optimize Git repository data
   merge                Join two or more development histories together
   mv                   Move or rename a file, a directory, or a symlink
   notes                Add or inspect object notes
   pull                 Fetch from and integrate with another repository or a local branch
   push                 Update remote refs along with associated objects
   range-diff           Compare two commit ranges (e.g. two versions of a branch)
   rebase               Reapply commits on top of another base tip
   reset                Reset current HEAD to the specified state
   restore              Restore working tree files
   revert               Revert some existing commits
   rm                   Remove files from the working tree and from the index
   shortlog             Summarize 'git log' output
   show                 Show various types of objects
   sparse-checkout      Initialize and modify the sparse-checkout
   stash                Stash the changes in a dirty working directory away
   status               Show the working tree status
   submodule            Initialize, update or inspect submodules
   switch               Switch branches
   tag                  Create, list, delete or verify a tag object signed with GPG
   worktree             Manage multiple working trees

Ancillary Commands / Manipulators
   config               Get and set repository or global options
   fast-export          Git data exporter
   fast-import          Backend for fast Git data importers
   filter-branch        Rewrite branches
   mergetool            Run merge conflict resolution tools to resolve merge conflicts
   pack-refs            Pack heads and tags for efficient repository access
   prune                Prune all unreachable objects from the object database
   reflog               Manage reflog information
   remote               Manage set of tracked repositories
   repack               Pack unpacked objects in a repository
   replace              Create, list, delete refs to replace objects

Ancillary Commands / Interrogators
   annotate             Annotate file lines with commit information
   blame                Show what revision and author last modified each line of a file
   bugreport            Collect information for user to file a bug report
   count-objects        Count unpacked number of objects and their disk consumption
   difftool             Show changes using common diff tools
   fsck                 Verifies the connectivity and validity of the objects in the database
   gitweb               Git web interface (web frontend to Git repositories)
   help                 Display help information about Git
   instaweb             Instantly browse your working repository in gitweb
   merge-tree           Show three-way merge without touching index
   rerere               Reuse recorded resolution of conflicted merges
   show-branch          Show branches and their commits
   verify-commit        Check the GPG signature of commits
   verify-tag           Check the GPG signature of tags
   whatchanged          Show logs with difference each commit introduces

Interacting with Others
   archimport           Import a GNU Arch repository into Git
   cvsexportcommit      Export a single commit to a CVS checkout
   cvsimport            Salvage your data out of another SCM people love to hate
   cvsserver            A CVS server emulator for Git
   imap-send            Send a collection of patches from stdin to an IMAP folder
   p4                   Import from and submit to Perforce repositories
   quiltimport          Applies a quilt patchset onto the current branch
   request-pull         Generates a summary of pending changes
   send-email           Send a collection of patches as emails
   svn                  Bidirectional operation between a Subversion repository and Git

Low-level Commands / Manipulators
   apply                Apply a patch to files and/or to the index
   checkout-index       Copy files from the index to the working tree
   commit-graph         Write and verify Git commit-graph files
   commit-tree          Create a new commit object
   hash-object          Compute object ID and optionally creates a blob from a file
   index-pack           Build pack index file for an existing packed archive
   merge-file           Run a three-way file merge
   merge-index          Run a merge for files needing merging
   mktag                Creates a tag object
   mktree               Build a tree-object from ls-tree formatted text
   multi-pack-index     Write and verify multi-pack-indexes
   pack-objects         Create a packed archive of objects
   prune-packed         Remove extra objects that are already in pack files
   read-tree            Reads tree information into the index
   symbolic-ref         Read, modify and delete symbolic refs
   unpack-objects       Unpack objects from a packed archive
   update-index         Register file contents in the working tree to the index
   update-ref           Update the object name stored in a ref safely
   write-tree           Create a tree object from the current index

Low-level Commands / Interrogators
   cat-file             Provide content or type and size information for repository objects
   cherry               Find commits yet to be applied to upstream
   diff-files           Compares files in the working tree and the index
   diff-index           Compare a tree to the working tree or index
   diff-tree            Compares the content and mode of blobs found via two tree objects
   for-each-ref         Output information on each ref
   for-each-repo        Run a Git command on a list of repositories
   get-tar-commit-id    Extract commit ID from an archive created using git-archive
   ls-files             Show information about files in the index and the working tree
   ls-remote            List references in a remote repository
   ls-tree              List the contents of a tree object
   merge-base           Find as good common ancestors as possible for a merge
   name-rev             Find symbolic names for given revs
   pack-redundant       Find redundant pack files
   rev-list             Lists commit objects in reverse chronological order
   rev-parse            Pick out and massage parameters
   show-index           Show packed archive index
   show-ref             List references in a local repository
   unpack-file          Creates a temporary file with a blob's contents
   var                  Show a Git logical variable
   verify-pack          Validate packed Git archive files

Low-level Commands / Syncing Repositories
   daemon               A really simple server for Git repositories
   fetch-pack           Receive missing objects from another repository
   http-backend         Server side implementation of Git over HTTP
   send-pack            Push objects over Git protocol to another repository
   update-server-info   Update auxiliary info file to help dumb servers

Low-level Commands / Internal Helpers
   check-attr           Display gitattributes information
   check-ignore         Debug gitignore / exclude files
   check-mailmap        Show canonical names and email addresses of contacts
   check-ref-format     Ensures that a reference name is well formed
   column               Display data in columns
   credential           Retrieve and store user credentials
   credential-cache     Helper to temporarily store passwords in memory
   credential-store     Helper to store credentials on disk
   fmt-merge-msg        Produce a merge commit message
   interpret-trailers   Add or parse structured information in commit messages
   mailinfo             Extracts patch and authorship from a single e-mail message
   mailsplit            Simple UNIX mbox splitter program
   merge-one-file       The standard helper program to use with git-merge-index
   patch-id             Compute unique ID for a patch
   sh-i18n              Git's i18n setup code for shell scripts
   sh-setup             Common Git shell script setup code
   stripspace           Remove unnecessary whitespace

External commands
   askyesno
   credential-helper-selector
   flow
   lfs
```

**Note:** If you find yourself stuck in the list view, `SHIFT + G` to jump the end of the list, then `q` to exit the view.

---
## Working with Git Branches

In Git, a `branch` is a new/separate version of the main repository.

Let's say you have a large project, and you need to update the design on it.

How would that work without and with Git:

Without Git:

- Make copies of all the relevant files to avoid impacting the live version
- Start working with the design and find that code depend on code in other files, that also need to be changed!
- Make copies of the dependant files as well. Making sure that every file dependency references the correct file name
- EMERGENCY! There is an unrelated error somewhere else in the project that needs to be fixed ASAP!
- Save all your files, making a note of the names of the copies you were working on
- Work on the unrelated error and update the code to fix it
- Go back to the design, and finish the work there
- Copy the code or rename the files, so the updated design is on the live version
- (2 weeks later, you realize that the unrelated error was not fixed in the new design version because you copied the files before the fix)

With Git:

- With a new branch called new-design, edit the code directly without impacting the main branch
- EMERGENCY! There is an unrelated error somewhere else in the project that needs to be fixed ASAP!
- Create a new branch from the main project called small-error-fix
- Fix the unrelated error and merge the small-error-fix branch with the main branch
- You go back to the new-design branch, and finish the work there
- Merge the new-design branch with main (getting alerted to the small error fix that you were missing)

Branches allow you to work on different parts of a project without impacting the main branch.

When the work is complete, a branch can be merged with the main project.

You can even switch between branches and work on different projects without them interfering with each other.

Branching in Git is very lightweight and fast!