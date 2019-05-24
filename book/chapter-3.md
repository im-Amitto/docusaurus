## Controller and Actions

Rails `Controllers` are Ruby classes, that store a series of actions.
`Actions` in a controller map to
urls involved in serving network requests from the app.
We will get into its details as chapter progresses.

Let's generate a controller to carry out tasks related operations.

```bash
$ rails generate controller Tasks
Running via Spring preloader in process 28301
      create  app/controllers/tasks_controller.rb
      invoke  erb
      create    app/views/tasks
      invoke  test_unit
      create    test/controllers/tasks_controller_test.rb
      invoke  helper
      create    app/helpers/tasks_helper.rb
      invoke    test_unit
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/tasks.coffee
      invoke    scss
      create      app/assets/stylesheets/tasks.scss


```

Notice that the above command has created multiple files.
Let's open the controller file `app/controllers/tasks_controller.rb`

```ruby
class TasksController < ApplicationController
end
```

Now let's add action `index` to  `TasksController`.
Open the file `app/controllers/tasks_controller.rb`
```ruby
class TasksController < ApplicationController

  def index
  end

end

```

now go to the browser and hit `http://0.0.0.0:3000/tasks`.


![alt text](https://github.com/bigbinary/markdown-book-generator/blob/master/book/images/tasksRouteError.png?raw=true)



## Defining route to map request path to controller action

Whenever we hit URL on the browser rails application looks up for that path in the routes file.
If a match is found, then the mapped action in the controller is invoked.
For example, let's add the code in routes file `config/routes.rb`
to route URL `http://0.0.0.0:3000/tasks` to `index` action in `TasksController`.

`config/routes.rb`
```ruby
Rails.application.routes.draw do

  get '/tasks', to: 'tasks#index'

end


```
Now try to refresh the browser.
![alt text](https://github.com/bigbinary/markdown-book-generator/blob/master/book/images/indexMissingError.png?raw=true)

Oops! We have an other error.
That's because Rails automatically searches for template with name `index.html.erb` within the directory `app/view/ControllerName/`.
Here `.erb` extension is for Embedded Ruby HTML file.


## Adding view file

So let's create the file that is being expected inside `/app/view/tasks/`.
This file is responsible for rendering all tasks' information in the browser.

`/app/view/tasks/index.html.erb`
```ruby
<H1>Hello!!</H1>
```

![alt text](https://github.com/bigbinary/markdown-book-generator/blob/master/book/images/HelloIndexPage.png?raw=true).


## Using Rails console add two tasks and Run Task.all

Now open your terminal and type `$ rails console`.

```bash
$ rails console
Running via Spring preloader in process 10511
Loading development environment (Rails 5.2.2)
irb(main):001:0>

```

Let's create a `Task` record and save it in the table.

```msg
irb(main):005:0> task = Task.new(description:"This is my first task")
=> #<Task id: nil, description: "This is my first task", created_at: nil, updated_at: nil>
irb(main):006:0> task.save
   (0.3ms)  begin transaction
  Task Create (0.7ms)  INSERT INTO "tasks" ("description", "created_at", "updated_at") VALUES (?, ?, ?)  [["description", "This is my first task"], ["created_at", "2019-01-30 07:35:50.117114"], ["updated_at", "2019-01-30 07:35:50.117114"]]
   (196.3ms)  commit transaction
=> true
irb(main):009:0>
```

Let's create one more task and try to save this record.

```msg
irb(main):007:0> task = Task.new(description:"This is my second task")
=> #<Task id: nil, description: "This is my second task", created_at: nil, updated_at: nil>
irb(main):008:0> task.save
   (0.1ms)  begin transaction
  Task Create (0.6ms)  INSERT INTO "tasks" ("description", "created_at", "updated_at") VALUES (?, ?, ?)  [["description", "This is my second task"], ["created_at", "2019-01-30 07:36:01.248102"], ["updated_at", "2019-01-30 07:36:01.248102"]]
   (181.4ms)  commit transaction
=> true
irb(main):009:0>
```
Calling `task.save` saves the object in the database.
i.e., an entry in `tasks` table will be created.

Now we can see all the tasks stored in the database using `Task.all`

```msg
irb(main):009:0> Task.all
  Task Load (0.3ms)  SELECT  "tasks".* FROM "tasks" LIMIT ?  [["LIMIT", 11]]
=> #<ActiveRecord::Relation [#<Task id: 3, description: "This is my first task", created_at: "2019-01-30 07:35:50", updated_at: "2019-01-30 07:35:50">, #<Task id: 4, description: "This is my second task", created_at: "2019-01-30 07:36:01", updated_at: "2019-01-30 07:36:01">]>
irb(main):010:0>

```
## Seeing the list of tasks in the browser

Let's display all the tasks in the browser.

`/app/controllers/tasks_controller.rb`
```ruby
class TasksController < ApplicationController

  def index
    @tasks = Task.all
  end

end
```

Now, change `app/views/tasks/index.html.erb` to have following code.

```ruby
<h1>Tasks List</h1>

<% @tasks.each do |task| %>
  <p>
    <%= task.description %>
  </p>
<% end %>
```

Now visit URL `http://0.0.0.0:3000/tasks` you can see all the tasks in the browser.