A task need to be assigned to a user to get it done.
In this chapter we will see how to assign a user to a task.

## Add a User model

Let's create a `User` model for our application.

`$ touch app/models/user.rb`

Add the following lines into the user.rb file and save it.
```ruby
class User < ApplicationRecord
end
```

## Create migration

Now let's generate a migration so that we have a table named `users`.

```bash
$ rails generate migration CreateUser
Running via Spring preloader in process 30090
      invoke  active_record
      create    db/migrate/20190209145206_create_user.rb
```

Open the migration file.

```ruby
class CreateUser < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
    end
  end
end
```

Now we will add `name` field with type `string` into the migration file.

```ruby
class CreateUser < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.timestamps
    end
  end
end

```

Now we need to migrate these changes into our database.

```bash
$ rails db:migrate
```

Now we have created the User model but till now there is no relationship between `User` and `Task` models.
Theoretically, a user can have many tasks. 

In order to identify to whom a task is assigned we need to create a new column in `tasks` table. We will call
this column `user_id` since it will stored user id of the person to whom the task is assigned.

So let's create a migration to add column `user_id` to `tasks` table.

```bash
$ rails generate migration add_user_id_to_tasks
```

The migration file will look like this.

```ruby
class AddUserIdToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :user_id
  end
end
```

Now we'll add a foreign key constraint to the tasks table so that it has only valid user ids in 
`user_id` column.

```bash
$ rails g migration AddForeignKeyToTask
```

Add following line to migrated file.

```ruby
class AddForeignKeyToTask < ActiveRecord::Migration[5.2]
  def change
    add_foreign_key :tasks, :users, column: :user_id, on_delete: :cascade
  end
end
```

The syntax for add_foreign_key is as following.

`add_foreign_key(from_table, to_table, options = {})`
where `from_table` is the table with the key column, `to_table` contains the referenced primary key.
The third parameter is an option which allows us to define our custom name for the column. 
The fourth parameter options as `on_delete: :cascade`. This option makes sure that child objects also get deleted when deleting parent.

Now run db:migrate command to reflect it into the database.

```bash
$ rails db:migrate
```

## Defining associations betweek Task and User models

A user can have many tasks assigned to him/her and tasks belong to a user.
Rails provides us an easy way to define such associations.

Add the following line into the `user.rb` file.

```ruby
class User < ApplicationRecord
  has_many :tasks, dependent: :destroy
end
```

Add the following line into the `task.rb` file.

```ruby
class Task < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
end
```

The `dependent: :destroy` is a callback and would destroy all the tasks created by a `user`, if the `user` is deleted.

## Create new `user`

We can perform all CRUD operations for `User` by defining the routes, controller and views
similar to how we had done in `Task`.

For now, Let's create user records from Rails console.

```bash
$ rails console

irb(main):004:0> User.create(name: "Sam")
   (0.1ms)  begin transaction
  User Exists (0.2ms)  SELECT  1 AS one FROM "users" WHERE "users"."name" = ? LIMIT ?  [["name", "Sam"], ["LIMIT", 1]]
  User Create (0.3ms)  INSERT INTO "users" ("name", "created_at", "updated_at") VALUES (?, ?, ?)  [["name", "Sam"], ["created_at", "2019-02-26 19:20:02.451901"], ["updated_at", "2019-02-26 19:20:02.451901"]]
   (189.2ms)  commit transaction
=> #<User id: 1, name: "Sam", created_at: "2019-02-26 19:20:02", updated_at: "2019-02-26 19:20:02">

irb(main):005:0> User.create(name: "John")
   (0.2ms)  begin transaction
  User Exists (0.3ms)  SELECT  1 AS one FROM "users" WHERE "users"."name" = ? LIMIT ?  [["name", "John"], ["LIMIT", 1]]
  User Create (0.5ms)  INSERT INTO "users" ("name", "created_at", "updated_at") VALUES (?, ?, ?)  [["name", "John"], ["created_at", "2019-02-26 19:20:17.609136"], ["updated_at", "2019-02-26 19:20:17.609136"]]
   (181.1ms)  commit transaction
=> #<User id: 2, name: "John", created_at: "2019-02-26 19:20:17", updated_at: "2019-02-26 19:20:17">
```

Similarly, Add user `Mary` and `Jane`.


## Update new task form to assign the user to the task

Now while creating a task we will assign a user to that task.

Update `tasks/new.html.erb` file as following:

```ruby
      .
      .
      .
      	<h3>Add new Task</h3>
	<%= form_for(@task) do |f| %>
            <%= f.label :description %>
            <%= f.text_field :description %>
            <%= collection_select(:task, :assignee_id, User.all, :id, :name) %>
            <%= f.submit "Create Task"%>
	<% end %>
```

we have `collection_select(:task, :assignee_id, User.all, :id, :name)` in the parameters afters sending form we'll get
`task` as params with attribute `assignee_id`. We are fetching all options for drop down menu from `User.all`.
then we are assigning `id` to `_id` and we'll display name corresponding to that `id`.

We can see how `collection_select` creates dropdown menu in following picture:
![alt text](./../img/DropdownMenu.png)

## Update task controller

Now update create action of task controller as following.

```ruby
.
.

def create
  @user = User.find(task_params[:assignee_id])
  @task = @user.tasks.new(task_params)

  if @task.valid?
    @task.save
    redirect_to task_url(@task)
  else
    render 'new'
  end
end
.
.
.
private

  def task_params
    params.require(:task).permit(:description, :assignee_id)
  end
end
```


## Uniqueness constraint for User's name

Add uniqueness and presence constraint in the `User` model.

```ruby
class User < ApplicationRecord
  has_many :tasks

  validates :name, presence :true, uniqueness: true
end
```

Here `uniqueness` helper validates that the attribute's value is unique right before the object gets saved.
