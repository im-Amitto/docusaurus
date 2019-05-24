---
id: chapter-8
title: Introduction to Validation
---

We observe that when we submit the form with a blank description, a new task is created.
We would want such entries not to be created. So to prevent this, we can add vaidations to our columns.

## Make `description` field  a Required Field.
We go to our task model `task.rb` and add the validation.

```msg
class Task < ApplicationRecord
  validates :description, presence: true
end
```
## Verify Validation

Before saving an object to the database, Rails runs your validations. If these validations produce any errors, Rails does not save the object.

Let's fire up the console using `$rails console`. 
Create an instance using the `new` method. 
This method does not run validations.

```msg
irb(main):011:0> t1 = Task.new(description: "I am a task with description")
=> #<Task id: nil, description: "hi", created_at: nil, updated_at: nil>
irb(main):012:0> t2 = Task.new
=> #<Task id: nil, description: nil, created_at: nil, updated_at: nil>
```

So we have two instances t1 and t2 where one has value `"I am a task with description"` and the other does not have a description assigned.

We can run the validations using built in method `valid?` which triggers the validations and returns true if no errors were found in the object, and false otherwise.

```msg
irb(main):013:0> t1.valid?
=> true
irb(main):014:0> t2.valid?
=> false
```
All that `valid?` method requires is an instance of `Task` to check for validations.
It returns `true` on the object `t1` as `description` is assigned and `false` on `t2` as the `description` is not assigned.

We can check for the errors associated with object `t2` using the `errors.messages` method, which returns a collection of errors.

```msg
irb(main):015:0> t2.errors.messages
=> {:description=>["can't be blank"]}
```
Now, we need to make a slight change to the create action of our file `tasks_controller.rb`.
```ruby
def create
  @task = Task.new(task_params)
  if @task.valid?
    @task.save
    redirect_to task_url(@task)
  end
end
```
We check that if the task is valid or not. If `yes` (true), it gets redirected to the `show` page, else it throws an error.

## Display errors

Rails provides a method `errors.full_messages` which returns an array of all the errors. We can render the users to the new page again if the task isn't valid. For that, we will make a change to the `create` action as follows :

```ruby
def create
  @task = Task.new(task_params)
  if @task.valid?
    @task.save
    redirect_to task_url(@task)
  else
    render 'new' #Render the new page when task is not saved to the db.
  end
end
```

To display the errors, we make the following changes to the file `new.html.erb`
```ruby
<div>
  <% if @task.errors.any? %>
    <ul>
      <% @task.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
    </ul>
  <% end %>
  <h3>Add new Task</h3>
  <%= form_for(@task) do |f| %>
    <%= f.label :description %>
    <%= f.text_field :description %>
    <%= f.submit "Create Task"%>
  <% end %>
</div>
```
So, if the instance `@task` contains any errors, the control enters the `if` block and iterates through the array returned by the method `errors.full_messages` and displays each element (1 error at a time). Let's try submitting the form with no `description`.

![alt text](./../img/DisplayErrorMessage.png)

The error message is displayed at the top after the controller renders the new page again and the `if` condition being true (since `description` field was blank), it displays the only error message which we expected.

## Validation Scope

Let's fire up our console using the command `$ rails console`. 
Get the total number of tasks in your db by running `Task.count`.

```msg
irb(main):013:0> Task.count
   (0.5ms)  SELECT COUNT(*) FROM "tasks"
=> 1
```

The count is `1` and yours maybe different. 
Now, let's run a raw sql query and see what happens when we don't pass any value for `description` field.

```msg
irb(main):001:0> sql = "INSERT INTO TASKS (id, created_at, updated_at) VALUES (3, '2019-02-07 10:01:47', '2019-02-07 10:01:47')"
=> "INSERT INTO TASKS (id, created_at, updated_at) VALUES (3, '2019-02-07 10:01:47', '2019-02-07 10:01:47')"
irb(main):002:0> ActiveRecord::Base.connection.execute(sql)
   (23.3ms)  INSERT INTO TASKS (id, created_at, updated_at) VALUES (3, '2019-02-07 10:01:47', '2019-02-07 10:01:47')
=> []
irb(main):003:0> Task.count
   (0.1ms)  SELECT COUNT(*) FROM "tasks"
=> 2
```
We observe that even when we had a validation for the description field, the above query still creates a record with blank field. This is beacuse our validation is not on the database level but at Rails level. Hence our tasks count increments by 1.

## Add migration to make description field NOT NULL

 Now, let's generate a migration for the description field to not allow nil values.
```msg
$ rails g migration MakeDescriptionNotNull
Running via Spring preloader in process 24660
      invoke  active_record
      create    db/migrate/20190211162942_make_description_not_null.rb
$
```

Now let's go to this file generated under `db/migrate/` folder and add the code to make `description` not null.

```msg
class MakeDescriptionNotNull < ActiveRecord::Migration[5.2]
  def change
  	change_column_null :tasks, :description, false
  end
end
```
Run the command `rails db:migrate` to apply the migration.

```bash
$ rails db:migrate
== 20190211162942 MakeDescriptionNotNull: migrating ===========================
-- change_column_null(:tasks, :description, false)
   -> 0.0044s
== 20190211162942 MakeDescriptionNotNull: migrated (0.0045s) ==================

```

Open the file `schema.rb` under the `db` folder. Observe the following line carefully
`t.string "description", null: false`
Now our `description` field is set to *NOT NULL*

## Verify Validation Again

Now fire up the console again using `rails c`.
Let's try creating a new task the same way we created before by inserting into the database directly.

```msg
irb(main):002:0> sql = "INSERT INTO TASKS (id, created_at, updated_at) VALUES (4, '2019-02-07 10:01:53', '2019-02-07 10:01:53');"
=> "INSERT INTO TASKS (id, created_at, updated_at) VALUES (4, '2019-02-07 10:01:53', '2019-02-07 10:01:53');"
irb(main):003:0> ActiveRecord::Base.connection.execute(sql)
   (0.7ms)  INSERT INTO TASKS (id, created_at, updated_at) VALUES (4, '2019-02-07 10:01:53', '2019-02-07 10:01:53');
Traceback (most recent call last):
        1: from (irb):3
ActiveRecord::NotNullViolation (SQLite3::ConstraintException: NOT NULL constraint failed: tasks.description: INSERT INTO TASKS (id, created_at, updated_at) VALUES (4, '2019-02-07 10:01:53', '2019-02-07 10:01:53');)
irb(main):004:0>
```
As expected, it throws a violation `NotNullViolation` which means our description can't be nil.
