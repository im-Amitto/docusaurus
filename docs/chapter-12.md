---
id: chapter_12
title: Chapter 12 - Introduction to Authorization
---

## 12.1 What is Authorization ?

Authorization in simple terms, means `What all You can do`. The `You` comes from the authentication which we saw in the previous chapter and as we can’t determine `what you can do` unless we know `who you are`, this makes `Authentication` to be required for `Authorization`.

So in this chapter, we'll `authorize` the `user` to `view` the `tasks` only if the task is `created` by the logged in user or `assigned` to it.

## 12.2 Introduction to Pundit gem

Let's consider for once, adding Authorization to our existing application without any extra help. Which files would we start making the changes to? It would be our existing `task` and `user` models and controllers etc.

Hence to take away the code complexity from these files, we'll introduce `Pundit` gem. Now the advantage is that we get to keep our controllers and models skinny.

Pundit helps us in creating role based authorization. It helps us to define policies which are `PORC - Plain Old Ruby Classes` which means that the class does not inherit from other classes nor include in other modules from the framework. Thus makes it very easy to understand the code.

## 12.3 Pundit gem installation.

* Add **gem 'pundit'** to your Gemfile.

* Include Pundit in your application controller:
```ruby
  class ApplicationController < ActionController::Base
    include Pundit
  end
```
* Run command **bundle install**.

## 12.4 Introduction to Policies

`Policies`, as defined before, are `PORC`, which house the authorization for a particular page. Here we'll craete a new folder under our `app` directory and name it `policies` and that would add a file named `task_policy.rb`. Then we'll add the following code.


```ruby
  class TaskPolicy
    attr_reader :user, :task

    def initialize(user, task)
      @user = user
      @task = task
    end

    # CRUD actions
    def show?
      # some condition which returns a boolean value
    end
  end
```

Pundit makes the following assumptions about this class:

* The class has the same name as that of model class, only suffixed with the word "Policy".Hence, the name TaskPolicy.
* The first argument is a `user`. In your controller, Pundit will call the `current_user` method to retrieve what to send       into this argument.
* The second argument is that of a model object, whose authorization you want to check.
* The class implements some kind of query method, in this case show?. Usually, this will map to the name of a particular       controller action.

## 12.5 Add TaskPolicy

Now let's look add the required code for class `TaskPolicy`

```ruby
class TaskPolicy
  attr_reader :user, :task

  def initialize(user, task)
    @user = user
    @task = task
  end

  # show? action is invoked when we call `authorize @task` in show action of the controller.
  # Here the condition that we want to check is whether the record's creator is current user or record is assigned to current   # user.
  def show?
    task.creator_id == user.id || task.assignee_id == user.id
  end

  # The condition to make sure a task is editable is the same as that of the show action.
  # So all we'll do is simply call `show?` inside the edit? action
  def edit?
    show?
  end

  # Similar is the case for update? action
  def update?
    show?
  end

  # Every user can create a task, hence create? will always return true
  def create?
    true
  end

  # Only the user that has created the task, can delete it
  def destroy?
    task.creator_id == user.id
  end

  #----previous code below -----
```

Now, let's add the authorize method to our controller actions. The required code is added as follows:

```ruby
class TasksController < ApplicationController
  before_action :require_login

  def index
    @tasks = policy_scope(Task)
  end

  def new
    @task = Task.new
  end

  def create
    @user = User.find(user_params[:user_id])
    @task = @user.tasks.new(task_params)
    authorize @task
    @task.creator_id = current_user.id

    if @task.valid?
      @task.save
      redirect_to task_url(@task)
    else
      render new
    end
  end

  def show
    @task = Task.find(params[:id])
    authorize @task
  end

  def edit
    @task = Task.find(params[:id])
    authorize @task
  end

  def update
    @task = Task.find(params[:id])
    authorize @task

    if @task.update_attributes(task_params)
    redirect_to @task
    end
  end

  def destroy
    @task = Task.find(params[:id])
    authorize @task
    @task.destroy
    redirect_to tasks_url
  end

  #-----previous code below------
```
We have added the line `authorize @task` to `show, edit, update and destroy` actions after initializing our `@task` instance variable.

The authorize method automatically infers that `Task` will have a matching `TaskPolicy` class, and instantiates this class, handing in the current user and the given record (@task in this case). It then infers from the action name, that it should call the respective action of class `TaskPolicy`. For example, the instance created by the authorize @task inside the show action, will call the `show?` action of Policy class.

In the example above of show action, you can imagine that authorize would have done something like this:

```ruby
unless TaskPolicy.new(current_user, @task).show?
  raise Pundit::NotAuthorizedError, "not allowed to show? this #{@task.inspect}"
end
```
This raises an exception. But Pundit allows us to rescue the exception with a method of our choice. So, let's add the code for that in our `application_controller.rb`.

```ruby
class ApplicationController < ActionController::Base
  include Pundit

  #------new line added here-----
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  #------end of added line------

  private

  #------previous code-----

  #-----new lines added here-----
  def user_not_authorized
    flash[:warning] = "All accesssable tasks are listed below."
    redirect_to root_path
  end
  #------end of added lines------

end
```

So whenever an action in TaskPolicy returns false (case of authorization fail), an exception is raised which is rescued with the method `user_not_authorized`.

Let's observe a Use case for above :-

Assumptions-
* Let's say there exists a task with id = 3 and a user with name = "John".
* Task with id = 3 is neither created by John nor assigned to John.
* John logs in by entering his email and password.
* Now John, enters the url localhost:3000/tasks/3/show

Since John is not authorized to view the task because of the above assumptions, rather than throwing him an error (the red page), Pundit raises an exception and rescues it by calling the method `user_not_authorized`. A message `All accessable tasks are listd below`is shown and the user is directed to the root path which was set to index action of tasks' controller's index action previously in this chapter.

## 12.6 Introduction to Policy scope.

If you closely observe, we did not make a change to our index action. As index action returns a collection of records, we need to apply a condition on a collection and we do that by using `Policy Scope`.

As we want to have our index view to display only the tasks which are either created by the current_user or assigned to the current_user, we will define a class called a policy scope. This class is nested inside the class `TaskPolicy`

```ruby
class TaskPolicy

 #------previous code -------

 #------add new lines here----
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(creator_id: user.id).or(scope.where(assignee_id: user.id))
    end
end
```

Pundit makes the following assumptions about this class:

* The class has the name Scope and is nested under the policy class.
* The first argument is a user. In your controller, Pundit will call the current_user method to retrieve what to send into     this argument.
* The second argument is a scope which is a collection of records.
* Instances of this class respond to the method resolve.
* This method contains the query run on the scope defined and then returns a result which is a collection and can be iterated   over.

 The corresponding change we make in the index action of Tasks controller is as follows:

```ruby
def index
  #------new line added here------
  @tasks = TaskPolicy::Scope.new(current_user, Task).resolve
  #-----end of added line-------
end
```

Let's observe what's going on here-

* Pundit creates an instance of class Scope (nested inside the class TaskPolicy) passing along the `current_user` and the `Task` model (our `scope` in this case) as parameters which get set in the `@user` and `@scope` instance variables   respectively inside the initialize method.

* Now this instance calls the method `resolve` where we run a query on our scope and it returns a collection of tasks which only       have the tasks that are either created by or assigned to the current_user.

Now to make it easier Pundit provides syntactic sugar where we can replace the line `TaskPolicy::Scope.new(current_user, Task).resolve` simply with the syntax `policy_scope(Task)`. It works exactly the same way as described before.

So now our code looks like:
```ruby
def index
  #------new line added here------
  @tasks = policy_scope(Task)
  #-----end of added line-------
end
```

This way we have authorized our user for all the controller actions and hence you can try running this in your applicaiton.
