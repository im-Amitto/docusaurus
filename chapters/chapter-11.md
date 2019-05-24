---
id: chapter-11
title: Authentication
---


## Bcrypt gem.

Authentication involves validating password provided by a user. 
For security reasons passwords should be stored in an encrypted form rather than in plain text.
In case our database is ever compromised, user password would still remain secure. 

The gem `bcpyt` uses an asymmetric algorithm thus encrypted string stored in DB is of no use to attacker. 
Installing this gem is a piece of cake obviously. 
Just uncomment/add following line from/to your `Gemfile`

```ruby
gem 'bcrypt', '~> 3.1.7'
```

Now execute the command mentioned below.

```bash
$ bundle install
```

## Add credentials fields to User model

Now let's add 2 fields to `User` model. 
First field will store username and the second field will store password. 
Run following command to add a migration.

```bash
$ rails g migration AddEmailAndPasswordDigestToUser
```

Now if we have a look at `taskmanager/db/migrate` directory, we can see a new file named `TIMESTAMP_add_email_and_password_digest_to_user.rb`. 
We need to alter this file to direct our database as to what fields are to be added/removed/modified when this migration runs. Modify your file to match following

```ruby
class AddEmailAndPasswordDigestToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :email, :string
    add_column :users, :password_digest, :string
  end
end
```

Now let's run the migration.

```bash
$ rails db:migrate
```

## User has_secure_password

Add following lines to `User` model.

```ruby
class User < ApplicationRecord
  # ----- add these lines here: -----
  has_secure_password

  # Verify that email field is not blank and that it doesn't already exist in the db (prevents duplicates):
  validates :email, presence: true, uniqueness: true
  # ----- end of added lines -----

  # ----- previous code -------
end
```

## Flash messages

Add following lines to `app/views/layouts/application.html.erb`.

```ruby
<!DOCTYPE html>
...
  <body>
    <%# ----- add these lines here: ----- %>

    <% flash.each do |key, value| %>
      <div class="alert alert-<%= key %>"><%= value %></div>
    <% end %>

    <%# ----- end of added lines ----- %>

    <%= yield %>
  </body>
</html>
```

The above added code will iterate through flash hash and print all messages. View file for any action is rendered with application layout by default. `<%= yield %>` will display that action's view file content in it's place.

## Signup

Let's implement user signup functionality to add users to our database.

### Users controller

Run following command to generate users controller file if not created already.

```bash
$ rails g controller users
```

Now if we navigate to `app/controllers` directory we can see a file named `users_controller.rb`. Let's modify it.

```ruby
class UsersController < ApplicationController

  # Responsible for rendering new user view file and initializing resource to be used with user signup form helper
  def new
    @user = User.new
  end

  # Responsible for handling form submit request
  def create

    # Creating user active record object from params
    @user = User.new(user_params)

    # If user save in the db is successful
    if @user.save
      flash[:notice] = 'Account created successfully!'

      redirect_to root_path
    else
      flash.now[:alert] = @user.errors.full_messages.join(', ')

      render :new
    end
  end

private

  # Responsible for restricting params from user signup form.
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
```

We received user details when signup form is submitted, we restrict those params in user_params method. 
We create user active record object using these params 
which will automatically assign values received in params to user attributes. Now you might have noticed these lines

`flash[:notice] = "Account created successfully!"`

`flash.now[:alert] = @user.errors.full_messages.join(', ')`

These lines are responsible for displaying messages on any page. 
But we need to modify our view files to make use of them. 
As of now these will be unused and we won't be able to see any message on our page.

Also another thing to note here is use of `flash` 
if save is successful but using `flash.now` when unsuccessful. 
Let's try to undertand these.

So when the save is successful we use `flash`, store our message in it and `redirect` to `users#new` page. 
This flash message stays persistent for 1 request and since `redirect` is a new browser request altogether, this works.

But in case when save is unsucessful we use `flash.now`, which sets the message for current request. 
As you would have noticed, we used `render :new` here and not `redirect`. 
This will not be a new browser request but just rendering of view file `users/new.html.erb`. 
But now the question arise we created a new dummy user active record object in new action `@user = User.new` for our signup form. But since we already have a `@user` variable here our signup form will use it. 
And this `@user` object already has values assigned to its attributes our form fields will have prefilled values for those fields. 
Minor rails magic but saves a great deal of effort when developing web functionalities!

### User routes

Let's add user routes by modifying `taskmanager/config/routes.rb`

```ruby
Rails.application.routes.draw do
  # ----- previous code -------

  # ----- add these lines here: -----

  # Add a root route if you don't have one...
  # We can even use some other controller and action as site root:
  root to: 'users#new'

  resources :users, only: [:new, :create]
  # ----- end of added lines -----
end
```

### New user view

We will need to create a view file for users controller new action. 
This view file will display our user signup form. 
Create a new file named `new.html.erb` in `taskmanager/app/views/users` directory.

```ruby
<h1>Sign Up</h1>

<%= form_for @user do |f| %>
  <div>
    <%= f.label :name %>
    <%= f.text_field :name, autofocus: true %>
  </div>
  <div>
    <%= f.label :email %>
    <%= f.text_field :email %>
  </div>

  <div>
    <%= f.label :password %>
    <%= f.password_field :password %>
  </div>
  <div>
    <%= f.label :password_confirmation %>
    <%= f.password_field :password_confirmation %>
  </div>
  <div>
    <%= f.submit "Sign up!" %>
  </div>
<% end %>
```

## Login

Lets use the credentials fields we added to authenticate and login a user. 
We won't need a model for session as we will be storing it in cookie and interact with it using rails session object.

### Sessions controller

Run following command to generate users controller file if not created already.

```bash
$ rails g controller sessions
```

Now if we navigate to `taskmanager/app/controllers` directory we can see a file named `sessions_controller.rb`. 
Let's modify it.

```ruby
class SessionsController < ApplicationController
# ----- add these lines here: -----

  def new
  end

  def create
    user = User.find_by(email: params[:login][:email].downcase)

    # If user exist in DB run has_secure_password's .authenticate()
    if user && user.authenticate(params[:login][:password])
      # Save the user.id in session cookie if password correct:
      session[:user_id] = user.id.to_s
      flash[:notice] = 'Successfully logged in!'
      redirect_to root_path
    else
      # if email or password incorrect, re-render login page:
      flash.now[:alert] = 'Incorrect credentials, try again.'
      render :new
    end
  end
  # ----- end of added lines -----
end
```

### Session routes

Let's add session routes by modifying `taskmanager/config/routes.rb`.

```ruby
Rails.application.routes.draw do
  # ----- previous code -------

  # ----- add these lines here: -----

  get '/login'     => 'sessions#new'

  post '/login'    => 'sessions#create'
    # ----- end of added lines -----
end
```

### Session views

We will need to create a view file for sessions controller new action. 
This view file will display our user signup form. 
Create a new file named `new.html.erb` in `taskmanager/app/views/sessions` directory.

```ruby
<h1>Log In</h1>
<%= form_for :login do |f| %>
  <div>
    <%= f.label :email %>
    <%= f.text_field :email, autofocus: true %>
  </div>
  <div>
    <%= f.label :password %>
    <%= f.password_field :password %>
  </div>
  <div>
    <%= f.submit "Log In" %>
  </div>
<% end %>
```

## Logout

### Sessions controller

Navigate to `taskmanager/app/controllers/sessions_controller.rb` and modify it.

```ruby
class SessionsController < ApplicationController
  # ----- previous code -------

  # ----- add these lines here: -----

  def destroy
    # remove saved user_id from the cookie:
    session.delete(:user_id)
    alert[:notice] = 'Logged out!'
    redirect_to login_path
  end
  # ----- end of added lines -----
end
```

### Session routes

Let's add session routes by modifying `taskmanager/config/routes.rb`. Also, let's make the tasks list as the root route for our applicaiton.

```ruby
Rails.application.routes.draw do
  # ----- previous code -------

  # ----- add these lines here: -----
  root to: 'tasks#index'

  delete '/logout' => 'sessions#destroy'
  # ----- end of added lines -----
end
```
We observe that now if we go to our application and type `localhost:3000`, we see the list of our tasks.

## Allow user to view Tasks only if Logged In.

Until now, the users were able so see tasks even without logging in.
Now let's restrict this behaviour and enable viewing tasks only when users are logged in.
The checks we'll have to carry out are as follows:
1) If user is logged in, we do nothing and allow the application flow to lead the way.
2) If user is not logged in, we stop the application flow and redirect the user to the Log In page.

To do this we can user `Filters` provided by Rails. `Filters` are methods that are run "before", "after" or "around" a controller action. We would be using a `before` filter here as we want to check if the user is logged in or not before letting him view the tasks list.

Let's go to our Tasks Controller and add the required code.

```ruby
class TasksController < ApplicationController
  # ----- add the line here: -----
  before_action :ensure_user_logged_in
  # ----- end of added line -----

  def index
    @tasks = Task.all
  end
```

Now, the method `ensure_user_logged_in` will be defined in the Applcation Controller and by making it this way we can use the method `ensure_user_logged_in` in any of our future controllers as in Rails, all Controller classes inherit from Applicaiton controller.

Now let's go to our Application Controller and define the method `ensure_user_logged_in`. So here is the required code and other methods that need to be added.

```ruby
class ApplicationController < ActionController::Base

  private
    def ensure_user_logged_in
      unless logged_in?
        flash[:danger] = "Please Log In to view the Tasks."
        redirect_to new_login_path
      end
    end

    def logged_in?
      current_user.present?
    end

    def current_user
      if session[:user_id]
        @current_user ||= User.find(session[:user_id])
      end
    end
end
```
Let's observe what's going on here.

* The control enters the method `ensure_user_logged_in` and from there it calls the method `logged_in?` which further calls the method `current_user`. The method `current_user` checks if our session[:user_id] exists and if it does, then the user having that `id` is set in the instance variable `current_user`. Don't get confused between `@current_user` and `current_user`. Former is an `instance variable` whereas latter is simply a `method name`.

* Now the `logged_in?` method returns true or false depending if `current_user` method sets the value of instance variable `@current_user` or not.

* Now this value gets returned to `ensure_user_logged_in` method which does nothing if the value received bu it is `true`
 and otherwise if `false` it pushes a value in the `flash` hash and redirects the user to the `login` page.

 * After this, the application view will be rendered. Now, let's add some code to the applicaiton view file to display user's name if the current_user is set.

```ruby
  <body>
    <% flash.each do |key, value| %>
      <div class="alert alert-<%= key %>"><%= value %></div>
    <% end %>
     # ----- previous code -------

     # ----- add these lines here: ----
    <div id = "container">
      <% if current_user %>
        Hi <%= current_user.name %>
        <br>
        <%= link_to "Logout", logout_path, method: :delete %>
      <% end %>
      <%= yield %>
    </div>
    # ----- end of added lines -----
  </body>
```

* Yield here is used to insert the rendered view of the tasks' `index.html.erb` file.

## Storing information of who created the task

Let's add a new column `creator_id` to tasks table.
To add a new column to our existing table, we'll generate a new migration.

```bash
$ rails g migration AddCreatorIdToTask :creator_id, :string
```
This would create a new file under the db/migrate folder. It should look something like this:

```ruby
class AddCreatorIdToTask < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :creator_id, :string
  end
end
```

The code already exists in the change method and the reason for that is that our migrattion is of the add_column_name_to_table_name column_name:type which Rails infers anf hence adds the code for that.

Now run
```bash
$ rails db:migrate
```
And with this the migration is up and running.

## Assinging current_user as task's creator

Now, we always want the `creator_id` of a task to bet set as that of the `current_user`. To implement that, we need to make change to the create action of Tasks controller.

```ruby
def create
  @user = User.find(user_params[:user_id])
  @task = @user.tasks.new(task_params)
  # ----- previous code -------

  # ----- add these lines here: ----
  @task.creator_id = current_user.id
  # ----- end of added line -----
```

With this change, the created task always has its creator_id set to that of the current_user.
