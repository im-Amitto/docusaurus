In this chapter, we'll add states for our Task.

## Introduce various states in tasks like open, in progress, done

There should be three states for any task. `Open`, `In progress` and `Done`.
Whenever we'll create the task then its state should be `open`.

For storing the states we'll use `enum` record type.

Enum: Entities that your model contain many attributes of various types. A quite popular requirement is to create an attribute that can be assigned to one of a few available values. In programming, that type is called enumeration or just enum.

Example:
We have three states for our task. We will keep this in the `task` model.

enum state: ["open", "in_progress", "done"]

And we'll add state column in the database with type Integer and then Rails will assign those value internally.

So, Let's add a new column `state` in the task table.

```bash
$ rails g migration add_state_to_tasks state:integer
Running via Spring preloader in process 14663
      invoke  active_record
      create    db/migrate/20190306032809_add_state_to_tasks.rb

```

Open your migration and add default value for your state
```ruby
class AddStateToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :state, :integer, default: "open"
  end
end

```
Now in the task model add the following line.
```ruby
class Task < ApplicationRecord
  ...

  enum state: ["open", "in_progress", "done"]
end
```
Now run `rails db:migrate` to reflect changes into the database.


## Update states on task show page through ajax requests.

Ajax is used to create asynchronous web applications. In this chapter, we will update the state of the task without refreshing the page.

Now we want to update the State of the particular task so it will be `PATCH` request.
So, Let's create another controller to handle the update request of state of the task.

`touch app/controllers/status_controller.rb `.

Before writing `update` action in `status` controller let's add routes for the status controller.
Let's create the nested routes for the status controller.
open `routes.rb` file.

Now we will use `resources :tasks` with nested `resources :status` which will generate all the routes for `task` controller so, remove the following lines.

```ruby
  get   '/tasks',               to: 'tasks#index'
  get   '/tasks/new' ,          to: 'tasks#new'
  post  '/tasks',               to: 'tasks#create'
  get   '/tasks/:id',           to: 'tasks#show', as: 'task'
  get   '/tasks/:id/edit',      to: 'tasks#edit', as: 'edit_task'
  patch '/tasks/:id',           to: 'tasks#update'
  delete'/tasks/:id',           to: 'tasks#destroy'

```
And add the following nested route.
```ruby
  resources :tasks do
    resource :status, only: [:update]
  end
```
Notice that we are using `resource` for status and not `resources`.
Defining `:resource` will make all the actions that we have for `:resources`
except `index` action.
In our use case, we are limiting to using only `update` action
i.e., a status of a task can only be updated.

Now add state field in our task show page.
open `app/views/tasks/show.html.erb` file
```ruby
<div>
	<h2> Here are your task details! </h2>
	<h3>
		<%= @task.id %>)
		<%= @task.description %>
	</h3>
	Current Task State :
	<span id="state">
		<strong><%= @task.state %></strong>
	</span>
	<br>
	<br>
	Change the state of Task:
	<%= button_to "open", task_status_url({task_id: @task.id, state: "open" }), remote: true, date:{type: 'script'}, method: :patch%>
	<%= button_to "in progress", task_status_url({task_id: @task.id, state: "in_progress" }), remote: true, date:{type: 'script'}, method: :patch%>
	<%= button_to "Done", task_status_url({task_id: @task.id, state: "done" }), remote: true, date:{type: 'script'}, method: :patch%>

	<%= link_to 'Edit', edit_task_path(@task) %>
</div>


```

`remote: true` is used to create Ajax call so, that page should not refresh and we should send the request to the server.

Now open controller `status_controller.rb` and `update` action as following.

```ruby
class StatusController < ApplicationController
  def update
    @task = Task.find(params[:id])
    @task.state = params[:state]
    if @task.save
      respond_to do |format|
        format.js { render 'update' }
      end
    end
  end
end

```

Now create new file `app/views/status/update.js.erb`.
and add following code in that file.
```ruby
$('#state').html("<strong><%= @task.state %><strong>");
```
We are using `jquery` here so we need to add `jquery-rails` gem in our Gemfile.
open Gemfile and add following gem.

`gem 'jquery-rails'`

And then run `bundle install`


then following lines in your `application.js` file.

```msg
//= require jquery
//= require jquery_ujs

```
Now open your show page of the task. Now we can change the state of the task without refreshing the page.
