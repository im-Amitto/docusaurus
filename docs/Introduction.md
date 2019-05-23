---
id: index
title: Introduction
---
>Application is avalable at https://github.com/bigbinary/learn-ruby-on-rails-book-application.

## Table of Contents

#### [Chapter 0 - Installing Ruby on Rails and VSCode](./chapter_0)
- [0.1 Installing Rails on Mac OS X](./chapter_0#01-installing-rails-on-mac-os-x)
- [0.2 Installing Rails on Windows](./chapter_0#02-installing-rails-on-windows)
- [0.3 Installing Rails on Linux](./chapter_0#03-installing-rails-on-linux)
- [0.4 Configure VSCode](./chapter_0#04-configure-vscode)

#### [Chapter 1 - Getting started with Ruby on Rails](./chapter_1)
- [1.1 Build a new Rails application](./chapter_1#11-build-a-new-rails-application)
- [1.2 Build database](./chapter_1#12-build-database)
- [1.3 Start server](./chapter_1#13-start-server)

#### [Chapter 2 - Build Task model](./chapter_2)
- [2.1 Create Task Model](./chapter_2#21-create-task-model)
- [2.2 Add a migration to create a tasks table](./chapter_2#22-add-a-migration-to-create-a-tasks-table)
- [2.3 Run migration](./chapter_2#23-run-migration)
- [2.4 Introduction to Rails console](./chapter_2#24-introduction-to-rails-console)

#### [Chapter 3 - Introduce Tasks controller](./chapter_3)
- [3.1 Controller and Actions](./chapter_3#31-controller-and-actions)
- [3.2 Defining route to map request path to controller action](./chapter_3#32-defining-route-to-map-request-path-to-controller-action)
- [3.3 Adding view file](./chapter_3#33-adding-view-file)
- [3.4 Using Rails console add two tasks and Run Task.all](./chapter_3#34-using-rails-console-add-two-tasks-and-run-taskall)
- [3.5 Seeing the list of tasks in the browser](./chapter_3#35-seeing-the-list-of-tasks-in-the-browser)

#### [Chapter 4 - Implement adding a new task](./chapter_4)
- [4.1 Introducing link_to](./chapter_4#41-introducing-link_to)
- [4.2 Adding new action in the controller](./chapter_4#42-adding-new-action-in-the-controller)
- [4.3 Adding template for new action and rendering the form](./chapter_4#43-adding-template-for-new-action-and-rendering-the-form)
- [4.4 Implementing create action](./chapter_4#44-implementing-create-action)
- [4.5 Verify changes in Rails console after submitting the form](./chapter_4#45-verify-changes-in-rails-console-after-submitting-the-form)

#### [Chapter 5 - Show a task](./chapter_5)
- [5.1 Implement show action in TasksController](./chapter_5#51-implement-show-action-in-taskscontroller)
- [5.2 Add view file for show action](./chapter_5#52-add-view-file-for-show-action)
- [5.3 Redirect to show page after task creation](./chapter_5#53-redirect-to-show-page-after-task-creation)
- [5.4 Application flow](./chapter_5#54-application-flow)
- [5.5 Use rails console to search tasks](./chapter_5#55-use-rails-console-to-search-tasks)

#### [Chapter 6 - Update the task](./chapter_6)
- [6.1 Implement Edit Task](./chapter_6#61-implement-edit-task)
- [6.2 Implement Update Task](./chapter_6#62-implement-update-task)

#### [Chapter 7 - Delete the task](./chapter_7)
- [7.1 Adding button to delete the task](./chapter_7#71-adding-button-to-delete-the-task)
- [7.2 Implement destroy action in TasksController](./chapter_7#72-implement-destroy-action-in-taskscontroller)
- [7.3 Flow of deleting a task](./chapter_7#73-flow-of-deleting-a-task)
- [7.4 Verify results on Rails console](./chapter_7#74-verify-results-on-rails-console)

#### [Chapter 8 - Introduction to Validation](./chapter_8)
- [8.1 Make description field a Required Field](./chapter_8#81-make-description-field-a-required-field)
- [8.2 Verify Validation](./chapter_8#82-verify-validation)
- [8.3 Display errors](./chapter_8#83-display-errors)
- [8.4 Validation Scope](./chapter_8#84-validation-scope)
- [8.5 Add migration to make description field NOT NULL](./chapter_8#85-add-migration-to-make-description-field-not-null)
- [8.6 Verify Validation Again](./chapter_8#86-verify-validation-again)

#### [Chapter 9 - Active Record Callbacks and Object life cycle](./chapter_9)
- [9.1 Introduction](./chapter_9#91-introduction)
- [9.2 List of Callbacks](./chapter_9#92-list-of-callbacks)
- [9.3 Registering Callbacks](./chapter_9#93-registering-callbacks)
- [9.4 Conditionally triggering the callbacks](./chapter_9#94-conditionally-triggering-the-callbacks)
- [9.5 When are these callbacks triggered?](./chapter_9#95-when-are-these-callbacks-triggered)

#### [Chapter 10 - Introduce User model](./chapter_10)
- [10.1 Add a User model](./chapter_10#101-add-a-user-model)
- [10.2 Create migration](./chapter_10#102-create-migration)
- [10.3 Defining associations betweek Task and User models](./chapter_10#103-defining-associations-betweek-task-and-user-models)
- [10.4 Create new user](./chapter_10#104-create-new-user)

#### [Chapter 11 - Authentication](./chapter_11)
- [11.1 Bcrypt Gem](./chapter_11#111-bcrypt-gem)
- [11.2 Add credentials field to User model](./chapter_11#112-add-credentials-fields-to-user-model)
- [11.3 Use `has_secure_password`](./chapter_11#113-user-has_secure_password)
- [11.4 Flash Messages](./chapter_11#113-user-has_secure_password)
- [11.5 Signup](./chapter_11#115-signup)
- [11.6 Login](./chapter_11#116-login)
- [11.7 Logout](./chapter_11#117-logout)
- [11.8 Allow user to view tasks only if logged in](./chapter_11#118-allow-user-to-view-tasks-only-if-logged-in)
- [11.9 Storing information of who created the task](./chapter_11#119-storing-information-of-who-created-the-task)
- [11.10 Assigning current_user as task's creator](./chapter_11#1110-assinging-current_user-as-task-s-creator)

#### [Chapter 12 - Authorization](./chapter_12)
- [12.1 What is Authorization ?](./chapter_12#121-what-is-authorization)
- [12.2 Introduce to Pundit gem](./chapter_12#122-introduction-to-pundit-gem)
- [12.3 Pundit gem installation](./chapter_12#123-pundit-gem-installation)
- [12.4 Introduction to Policies](./chapter_12#124-introduction-to-policies)
- [12.5 Add TaskPolicy](./chapter_12#125-add-taskpolicy)
- [12.6 Introduction to Policy Scope](./chapter_12#126-introduction-to-policy-scope)

#### [Chapter 13 - State Management via Ajax](./chapter_13)
- [13.1 Introduce various states in tasks like `open`, `in progress`, `done`](./chapter_13#131-introduce-various-states-in-tasks-like-open-in-progress-done)
- [13.2 Update states on task show page through ajax requests](./chapter_13#131-introduce-various-states-in-tasks-like-open-in-progress-done)

#### [Chapter 14 - Adding comments to tasks](./chapter_14)
- [14.1 Introduce Comment model](./chapter_14#141-introduce-comment-model)
- [14.2 Add route for Comments](./chapter_14#142-add-route-for-comments)
- [14.3 Add Comments controller](./chapter_14#143-add-comments-controller)
- [14.4 Add Comments to Task's show page](./chapter_14#144-add-comments-to-the-task-s-show-page)

#### [Chapter 15 - Attaching files](./chapter_15)
- [15.1 Since task and messages can have attachments to them, we'll introduce polymorphic association here.](./chapter_15#151-since-task-and-messages-can-have-attachments-to-them-we-ll-introduce-polymorphic-association-here)
- [15.2 Introduce Attachment model and have Task and Message as `attachable`.](./chapter_15#152-introduce-attachment-model-and-have-task-and-message-as-attachable)
- [15.3 We'll also introduce Attachable concern in Task and Message models and define association there.](./chapter_15#153-we-ll-also-introduce-attachable-concern-in-task-and-message-models-and-define-association-there)
- [15.4 Bind Attachment model with ActiveStorage.](./chapter_15#154-bind-attachment-model-with-activestorage)
- [15.5 Make necessary changes to Task form and controllers and build ability to attach files.](./chapter_15#155-make-necessary-changes-to-task-form-and-controllers-and-build-ability-to-attach-files)

#### [Chapter 16 - Introduction to Testing and Writing Unit Tests](./chapter_16)
- [16.1 Write tests for Task model](./chapter_16#161-why-write-tests)
- [16.2 Test setup](./chapter_16#162-test-setup)
- [16.3 Testing Task model](./chapter_16#163-testing-task-model)
- [16.4 A few gotchas of testing](./chapter_16#164-a-few-gotchas-of-testing)

#### [Chapter 17 - Integration tests (ON HOLD by Neeraj)]()
- [17.1 Write tests for TasksController]()

#### [Chapter 18 - System Tests (ON HOLD by Neeraj)]()
- [18.1 Write system test for task creation, deletion etc.]()

#### [Chapter 19 - Configuring queue adapters for background processing](./chapter_19)
- [19.1 Choosing a backend adapter?](./chapter_19#191-choosing-a-backend-adapter)
- [19.2 Creating a Job](./chapter_19#192-creating-a-job)
- [19.3 Executing the Job](./chapter_19#193-executing-the-job)
- [19.4 Active Job callbacks](./chapter_19#194-active-job-callbacks)
- [19.5 Using job to log ip address](./chapter_19#195-using-job-to-log-ip-address)

#### [Chapter 20 - Email Notifications]()
- [20.1 Send an email when task gets assigned to someone.]()
- [20.2 Make use of queue adapter used]()
- [20.3 Use letter_opener_web to show display email in the current browser itself.]()
- [20.4 Add a one line note about how we can see the previews for emails.]()
- [20.5 write unit test that verifies an email is sent when a task is assigned to a different person.]()

>Missing items
>==============
>Find a way to discuss following things.
>
>- custom helpers
>
>- Hashes and symbols as key
>
>- What is monkey patching
>
>- Making buttons look better with some scss and bootstrap
>
>- Using partials
>
>- what is asset pipeline and where do I put images ns how
>
>- Build "priorty" feature and learn about `resources`. Prioryt can be "High", "Medium" or "Low" or a custom value.
>
>- A task can be assigned a priority.
>
>- foreign keys. Discuss what it is. Add foreign Keys.
>
>- Using `resource` in routes
>
>- Using `debugger` in controller and how to debug code.
>
>- Debugging code in view


#### [Chapter - 21 Building APIs]()

>We need to find a good reason to build apis.

- [21.1 Add API for getting tasks list [GET]]()
- [21.2 Add API for tasks creation [POST]]()
- [21.3 Add API for tasks deletion [DELETE]]()
- [21.4 Add API for task update [PUT/PATCH]]()



## Best Practics (for later)

- [Don't generate predicate methods with is prefix](https://github.com/bigbinary/aceinvoice-web/pull/2128)
