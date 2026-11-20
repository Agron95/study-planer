# Study Planner

## Project idea

Build a simple website where students can add study tasks, mark them complete, and filter their list. Tasks stay available after refreshing the browser. This project practices forms, DOM updates, arrays, and localStorage.

## Technology and scope

Use plain HTML, CSS, and JavaScript. No frameworks, packages, build tools, backend, or external services are required. This initial repository contains the assignment only; students build the application through the tasks below.

The finished application should run by opening `index.html` in a modern browser. Use the same browser and file location when checking saved data; browser storage behavior for local files can vary. If needed, use your editor's local preview server consistently.

## Team assignments

- **student1**: tasks 01, 04, 07, 10.
- **student2**: tasks 02, 05, 08.
- **student3**: tasks 03, 06, 09.

There are exactly 10 tasks and each task has one owner. One student has four tasks and the other two have three each. Teammates review each other's pull requests.

## GitHub setup and pull request workflow

The teacher should create an empty GitHub repository for this project, push this local repository's `main` branch, and give all three students access. Replace the placeholders below with that repository's URL:

```sh
git remote add origin <github-repository-url>
git push -u origin main
```

Students then clone the GitHub repository. Complete the numbered tasks in order, merging each task before starting the next; later tasks build on earlier work. For every task, its owner must:

1. Update their local `main` branch and create a new task branch.
2. Implement only that task and manually check its completion criteria.
3. Commit and push the branch, then open one GitHub pull request targeting `main`.
4. Put the task number, changes, and manual-check results in the PR description; add a screenshot for visible UI changes.
5. Ask another team member to review, address feedback, and merge after approval. Mark the task checkbox complete in the same PR.

Example for task 01 (replace the student and task number for your own assignment):

```sh
git switch main
git pull --ff-only origin main
git switch -c student1/task-01
# Make and check your changes, then stage the files you changed.
git add .
git commit -m "Complete task 01: create page structure"
git push -u origin student1/task-01
```

Use GitHub's **Compare & pull request** button after pushing. Suggested PR title: `[Task 01] Create page structure (student1)`. Do not push task work directly to `main`. The finished project should have **10 task PRs**, one per task. PRs are submitted when students implement their tasks.

## Tasks

### 01. Create the page structure

- [ ] Complete and merge this task.
- **Owner:** student1
- **Branch:** `student1/task-01`
- **Work:** Create index.html with a page title, a labeled task form (subject, task title, due date), a task-list container, and a status-message area. Link styles.css and a deferred script.js. Use semantic HTML and create the two linked files.
- **Done when:** The page opens without missing-file errors and every form input has a visible label.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 02. Style the planner

- [ ] Complete and merge this task.
- **Owner:** student2
- **Branch:** `student2/task-02`
- **Work:** In styles.css, style the form, task cards, buttons, empty state, and visible keyboard focus. Add a layout that works on a narrow phone and a desktop.
- **Done when:** The page has no horizontal overflow at 360px width, and controls remain easy to read and use.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 03. Add and display study tasks

- [ ] Complete and merge this task.
- **Owner:** student3
- **Branch:** `student3/task-03`
- **Work:** In script.js, keep tasks in an array with unique id, subject, title, dueDate, and completed fields. Handle form submission, reject blank or whitespace-only text, render task cards, and reset the form after success. Insert user text with textContent.
- **Done when:** Adding two valid tasks shows two cards; invalid input shows a helpful message and adds nothing.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 04. Mark tasks complete

- [ ] Complete and merge this task.
- **Owner:** student1
- **Branch:** `student1/task-04`
- **Work:** Add a checkbox to each task and update its completed state by id. Give completed tasks a clear visual style and make the control accessible by keyboard.
- **Done when:** Toggling one task twice changes only that task and restores its original state.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 05. Delete a task

- [ ] Complete and merge this task.
- **Owner:** student2
- **Branch:** `student2/task-05`
- **Work:** Add a labeled delete button to each task card. Remove the selected task by id, rerender the list, and show a friendly message when no tasks remain.
- **Done when:** Deleting the middle of three tasks removes only that task; deleting all tasks shows the empty state.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 06. Filter the task list

- [ ] Complete and merge this task.
- **Owner:** student3
- **Branch:** `student3/task-06`
- **Work:** Add All, Active, and Completed filter buttons. Track the selected filter and render a filtered view without removing tasks from the source array.
- **Done when:** Each filter displays the expected tasks and visibly identifies the selected filter.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 07. Show progress totals

- [ ] Complete and merge this task.
- **Owner:** student1
- **Branch:** `student1/task-07`
- **Work:** Display total, active, and completed task counts. Recalculate them after adding, completing, or deleting a task; counts must describe the full list regardless of the filter.
- **Done when:** Counts remain correct while switching filters and after every task action.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 08. Save tasks locally

- [ ] Complete and merge this task.
- **Owner:** student2
- **Branch:** `student2/task-08`
- **Work:** Save the task array to a project-specific localStorage key after every change and restore it on load. Handle missing or malformed saved JSON and unavailable storage without crashing.
- **Done when:** Tasks and completion states survive refresh when storage is available; bad saved data leaves a usable empty planner.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 09. Highlight overdue tasks

- [ ] Complete and merge this task.
- **Owner:** student3
- **Branch:** `student3/task-09`
- **Work:** Show an Overdue label for incomplete tasks whose due date is before the user's current local calendar date. Treat date inputs as local calendar dates and do not label tasks due today as overdue.
- **Done when:** Yesterday's incomplete task is overdue; today's task and completed tasks are not.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.

### 10. Finish accessibility and document manual checks

- [ ] Complete and merge this task.
- **Owner:** student1
- **Branch:** `student1/task-10`
- **Work:** Check labels, focus order, keyboard controls, readable contrast, and the 360px layout. Fix issues and add a Manual testing section to this README covering add, toggle, delete, filters, counts, refresh, and overdue dates.
- **Done when:** Record actual pass/fail results and browser used; all listed features pass before the final PR is merged.
- **Deliverable:** One GitHub PR for this task, reviewed by another team member.
