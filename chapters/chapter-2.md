---
id: chapter-2
title: Chapter 2 - Task model
---

## Create Task Model

Let's create a model.
Models are stored in `app/models`.
Rails encourages use to have model names are singular
Now let's create a new file using `touch` command.

```bash
$ touch app/models/task.rb
```

Add the lines as shown below and save it.

```ruby
class Task < ApplicationRecord
end
```

We have created our first model.

## Add a migration to create a tasks table

Migrations are a convenient way to alter your database.
Let's generate our first migration.

```bash
$ rails generate migration CreateTasks
Running via Spring preloader in process 15478
      invoke  active_record
      create    db/migrate/20190128151553_create_tasks.rb
```

We see a file is generated under the `db/migrate` folder.
This is where all the migrations reside.

Now, let's add a table to our `Task` model.
Rails encourages us to have pluralized version of the model name as name of the table.
So in this plural version of `Task` is `Tasks`. So `Tasks` will be nane of the table.

While creating the table we also want to create a column called `description`.
It is a convention in Rails that all tables should have `created_at` and `updated_at`
columns. This is accomplished by adding `t.timestamps` in the migration as shown below.

```ruby
class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :description
      t.timestamps
    end
  end
end
```

## Run migration

Now that we have added the migration file,
let's run the migration so that it takes effect
and table `tasks` is created in our database.
Run the following command in your terminal.

```bash
$ rails db:migrate
== 20190128151553 AddTaskModel: migrating =====================================
-- create_table(:tasks)
   -> 0.0015s
== 20190128151553 AddTaskModel: migrated (0.0015s) ============================

```

## Introduction to Rails console

Rails console is a command line program for interacting with the Rails applications.
It has the full power of the Ruby language and Rails environment.
We can start the Rails console using the following command.

```bash
$ rails console
Running via Spring preloader in process 18878
Loading development environment (Rails 5.1.6.1)
irb(main):001:0>
```
Let's run some commands to see how Rails console can help us get some useful information.

1. `Task.column_names` returns the names of all the columns of `tasks` table.

```msg
irb(main):003:0> Task.column_names
=> ["id", "description", "created_at", "updated_at"]
```

Notice that we have a column named `id` present.
Rails adds this column ,by default, and it serves as the primary key for the table.
The value of the id auto increments when a new record is created.
We will see it in action shortly.

2. `Task.count` returns the number of records in the table.

```msg
irb(main):002:0> Task.count
   (0.1ms)  SELECT COUNT(*) FROM "tasks"
=> 0
```

It means right now we do not have any record in `Tasks` table.

3. `Task.create` creates and saves a new task in the database.

```msg
irb(main):004:0> Task.create
   (0.3ms)  begin transaction
  SQL (2.8ms)  INSERT INTO "tasks" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2019-01-28 17:00:26.379031"], ["updated_at", "2019-01-28 17:00:26.379031"]]
   (11.7ms)  commit transaction
=> #<Task id: 1, description: nil, created_at: "2019-01-28 17:00:26", updated_at: "2019-01-28 17:00:26">
```

Notice that the id is 1.
If we create one more task then the id of the new task will be 2.

We can exit the console by entering `exit`.