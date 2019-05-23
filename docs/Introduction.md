---
id: index
title: Introduction
---
>Application is avalable at https://github.com/bigbinary/learn-ruby-on-rails-book-application.

## Table of Contents

#### [Chapter 0 - Installing Ruby on Rails and VSCode](./chapter_0)

#### [Chapter 1 - Getting started with Ruby on Rails](./chapter_1)

#### [Chapter 2 - Build Task model](./chapter_2)

#### [Chapter 3 - Introduce Tasks controller](./chapter_3)

#### [Chapter 4 - Implement adding a new task](./chapter_4)

#### [Chapter 5 - Show a task](./chapter_5)

#### [Chapter 6 - Update the task](./chapter_6)

#### [Chapter 7 - Delete the task](./chapter_7)

#### [Chapter 8 - Introduction to Validation](./chapter_8)

#### [Chapter 9 - Active Record Callbacks and Object life cycle](./chapter_9)

#### [Chapter 10 - Introduce User model](./chapter_10)


#### [Chapter 11 - Authentication](./chapter_11)
- Bcrypt Gem
- Add credentials field to User model
- Use `has_secure_password`
- Flash Messages
- Signup
- Login
- Logout
- Allow user to view tasks only if logged in
- Storing information of who created the task
- Assigning current_user as task's creator

#### [Chapter 12 - Authorization](./chapter_12)
- What is Authorization ?
- Introduce to Pundit gem
- Pundit gem installation
- Introduction to Policies
- Add TaskPolicy
- Introduction to Policy Scope

#### [Chapter 13 - State Management via Ajax](./chapter_13)
- 13.1 Introduce various states in tasks like `open`, `in progress`, `done`.
- 13.2 Update states on task show page through ajax requests.

#### [Chapter 14 - Adding comments to tasks](./chapter_14)
- Introduce Comment model
- Add route for Comments
- Add Comments controller
- Add Comments to Task's show page

#### 15. Attaching files
- Since task and messages can have attachments to them, we'll introduce polymorphic association here.
- Introduce Attachment model and have Task and Message as `attachable`.
- We'll also introduce Attachable concern in Task and Message models and define association there.
- Bind Attachment model with ActiveStorage.
- Make necessary changes to Task form and controllers and build ability to attach files.

#### 16. [Introduction to Testing and Writing Unit Tests](./chapter_16)
- Write tests for Task model.

#### 17. Integration tests (ON HOLD by Neeraj)
- Write tests for TasksController.

#### 18. System Tests (ON HOLD by Neeraj)
- Write system test for task creation, deletion etc.

#### 19. [Configuring queue adapters for background processing](./chapter_19)
- What is queue adapter?
- Configuring redis and sidekiq.
- perform, perform_now and perform_later.

#### 20. Email Notifications
- Send an email when task gets assigned to someone.
- Make use of queue adapter used
- Use letter_opener_web to show display email in the current browser itself.
- Add a one line note about how we can see the previews for emails.
- write unit test that verifies an email is sent when a task is assigned to a different person.

Missing items
==============
Find a way to discuss following things.

- custom helpers

- Hashes and symbols as key

- What is monkey patching

- Making buttons look better with some scss and bootstrap

- Using partials

- what is asset pipeline and where do I put images ns how

- Build "priorty" feature and learn about `resources`. Prioryt can be "High", "Medium" or "Low" or a custom value.

- A task can be assigned a priority.

- foreign keys. Discuss what it is. Add foreign Keys.

- Using `resource` in routes

- Using `debugger` in controller and how to debug code.

- Debugging code in view


#### 21. Building APIs

We need to find a good reason to build apis.

- Add API for getting tasks list [GET].
- Add API for tasks creation [POST].
- Add API for tasks deletion [DELETE].
- Add API for task update [PUT/PATCH].



## Best Practics (for later)

- [Don't generate predicate methods with is prefix](https://github.com/bigbinary/aceinvoice-web/pull/2128)
