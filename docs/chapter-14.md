---
id: chapter_14
title: Chapter 14 - Adding comments to Tasks
---

In this chapter, we'll add the feature to **Display** and **Add Comments** on a Task's show page.

## 14.1 Introduce Comment Model

We'll create a new model Comment. Run the the following command in the terminal.

```bash
$ rails generate model Comment content:text task:references user:references
```

Here we have generated the `migration` for the `model` using the `rails generate` command. By passing `content:text`, we add a column `content` to the `Comments` table having data type as `text`.

Now if we observe, every comment would belong to a task and as well to the user who is adding the comment. Hence, that's the reason we pass `task:references` and `user.references` which adds the required associations and foreign key constraints rather than to make those changes manually.

This is how the comment.rb file would look after the required associations are added
```ruby
class Comment < ApplicationRecord
  belongs_to :user                        # Each comment belongs to a single user
  belongs_to :task                        # Each comment belongs to a single task
end
```
Now open the last migration file under the `db/migrate` folder. It should be as follows:

```ruby
class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :content                       # content column of type text
      t.references :user, foreign_key: true # t.references adds a column user_id to the comments table and by passing an                                                 # option foreign_key: true, a foreign key constraint is added
      t.references :task, foreign_key: true # similarly as above, a column task_id is added as well the foreign key constraint

      t.timestamps
    end
  end
end
```

There are other files generated as well by the above migration but let's not worry about them right now.

Let's run the migration using `rails db:migrate` for the changes to take effect.

Now similarly we have to make changes in the `Task` and `User` models to introduce associations for comments.

```ruby
class Task < ApplicationRecord
  belongs_to :user, foreign_key: "assignee_id"
  #------new line added here------
  has_many :comments, dependent: :destroy     # Each task can have many comments.
  #------end of new lines--------

  #-------previous code below -------

end
```

```ruby
class User < ApplicationRecord
  has_many :tasks, foreign_key: "assignee_id"
  #------new line added here------
  has_many :comments, dependent: :destroy     # Each user can add many comments
  #------end of new lines--------

  #-------previous code below -------

end
```
`dependent: :destroy` is a callback which makes sure that when a `task` is deleted, all the comments added to it are deleted as well. Similarly, the same callback is passed in the `User` model, which would delete all the comments by a user when the user is deleted.

## 14.2 Add Route for Comments

We add a nested route for the comments as we are going to allow to add a comment from an exisiting task's show page.

```ruby
  resources :tasks do
    resources :status, only: [:update]
    #------new line added here------
    resources :comments, only: [:create]
    #------end of new line--------
  end
```
`only: [:create]` specifies to create only 1 route which would be for the create action. Hence, a route of the format `/tasks/:task_id/comments` is created which would send a `POST` request to the `create` action of the `comments` controller.

## 14.3 Add Comments controller

Let's add a **Comments** controller. We'll only be adding the `create` action in our controller as we have defined a route only for this action.

```ruby
class CommentsController < ApplicationController
  before_action :current_user                        # Loads the logged in user (method inside Application Controller)
  before_action :fetch_task                          # Fetches the task for which the comment is to be added.

  def create
    @comment = @task.comments.create(comment_params) # Associates the new comment instacne to the task fetched.
    @comment.user_id = current_user.id               # Assigns the current_user's id to the new comment's user_id field.
    if @comment.save                                 # If saved, the user is redirected to the loaded task's show page
      redirect_to @task
    end
  end

  private
    def fetch_task
      @task = Task.find(params[:task_id])
    end

    def comment_params
      params.require(:comment).permit(:content)
    end
end
```

## 14.4 Add comments to the Task's show page.

We'll make a slight change to the show action in the Tasks controller to load all the comments of the loaded task so that we can render those comments on the task's show page.

```ruby
  def show
    @task = Task.find(params[:id])
    authorize @task
    #------ new line added here------
    @comments = @task.comments              # Loads all the comments of the loaded task in an instance variable
    #------end of added line------
  end
```

```ruby
  #-------previous code--------


  #-------new lines added here---------
  <div>
    <h2><strong>Comments</strong></h2>
      <% @comments.each do |comment| %>                 # Iterate through each comment from Collection @comments
        <h3>
        <%= comment.content %>                          # Display each comment's content
        </h3>
        <%= time_ago_in_words(comment.created_at) %><span> ago</span>    # Convert and display each comment's time at                                                                                  # which it was created
        <br>
      <% end %>
    <%= render 'comments/form' %>                       # Using Partials (Concept explained below)
  </div>
  #---------new lines end here-----------
```

* **Partials** - are used for breaking the rendering process into more manageable chunks. With a partial, you can move the code for rendering a particular piece of a response to its own file.

* To render a partial as part of a view, we use the `render` method within the view:

* Here we use `<%= render 'comments/form' %>`. This tells Rails to look for a file named `_form.html.erb` under the `app/views/comments` directory.

* Every partial file starts with the symbol `_`, hence the name `_form`. This is a convention followd by Rails to identify partial files.

* Hence, we need to create a new folder **comments**  inside the `app/views` directory. It can either be done manually by right clicking on the **views** or by using the `touch` command.

* Then we create a new file `_form.html.erb` inside this folder. The process of creating a new folder (in this case comments) is called as `namesapcing`. The reason we choose to namespce it under the `comments` folder is to be clear for which resource the form is created as in future there could be more `_form.html.erb` partials for other resources.


Since we are done creating the partial file, let's add the required code for rendering the form to add a new comment.

```ruby
<%= form_for ([@task, @task.comments.new]) do |f| %>
  <br>
  <%= f.label :content, "Add Comment" %>
  <br>
  <%= f.text_area :content %>
  <br>
  <%= f.submit "Submit" %>
<% end %>
```

We use the `form_for` method and pass it both the instances `@task, @task.comments.new` so that it geneartes the `url` to which it is supposed to hit once the `form` is submitted and also to create the form fields for the second instance which is yet to be created.

When you click the submit button, a `POST` request is sent to the `create` action of `Comments` controller, after which the user is redirected to the loaded task's show page. The show page displays the newly created `comment` and also displays the form to add more comments.
