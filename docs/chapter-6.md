---
id: chapter_6
title: Chapter 6 - Update the task
---

## 6.1 - Implement Edit Task

So far we have implemented how to `create` new tasks, how to view the newly created task's details using the `show` action.
Now, we'll implement the functionality to edit our existing task's details.
In order to do that, we start by adding an edit action in our tasks controller.

```ruby
.
def edit
  @task = Task.find(params[:id])
end
.
```
In a similar way, as seen in the show action, this method retrieves the task from the database using the id attribute from the params hash.

Let's create view file `edit.html.erb` to render the edit form.

```bash
$ touch app/views/tasks/edit.html.erb
```

We add the following lines in our new file.
We also add an `Update Task` button in the view.

```ruby
<div>
  <h3>Enter New Details.</h3>
  <%= form_for(@task) do |f| %>
    <%= f.label :description %>
    <%= f.text_field :description %>

    <%= f.submit "Update Task"%>
  <% end %>
</div>
```
We include the edit button in the `show` view as follows. We'll see from where this, `edit_task_path(@task)`, name came later in this chapter.

```ruby
<div>
  <h2> Here are your task details! </h2>
  <h3>
    <%= @task.id %>)
    <%= @task.description %>
  </h3>
  <%= link_to 'Edit', edit_task_path(@task) %>
</div>
```
![alt text](./../img/EditLink.png)

Now whenever we view a task, we see an `edit` link. Let's try clicking on that.

![alt text](./../img/EditRouteError.png)

As seen before, the route for edit action has yet not been defined and hence, no matched route was found for `/tasks/12/edit`.

Let's add that route in the `/config/routes.rb` file.

```ruby
 get   '/tasks/:id/edit', to: 'tasks#edit', as: 'edit_task'
```
We have once again given a name to this path using the `as:` keyword. We have already used such name in the show action and this is where it came from.

Now as we load the page again and click on the `edit` link once again, the edit form is rendered by the view `edit.html.erb`.

![alt text](./../img/EditTask.png)

## 6.2 - Implement Update Task
We observe that the `description` field in the above image already has an existing value of that task.
We change the value to `"My first edit"` and click the `Update Task` button.

![alt text](./../img/UpdateRouteError.png)

Again as we have seen quite a few times now, no route matched `[PATCH] /tasks/12`. Hence we go to our `routes.rb` file and add the following line.

```ruby
patch '/tasks/:id',      to: 'tasks#update'
```
We haven't used a `patch` method before. For now, let's just say the router expects a `patch` request, a kind of request, whenever we need to update anything.

Now, let's try again clicking the `update task` button.

![alt text](./../img/UpdateActionError.png)

This time the router found the `tasks` controller but could not find the corresponding `update` action (as required by the patch request).
Hence, now is a good time to add the update action to our `tasks` controller.

```ruby
def update
  @task = Task.find(params[:id])
	if @task.update_attributes(task_params)
	  redirect_to @task
  end
end
```
We use the `update_attributes` method defined on the task object to save the new values for the attributes of the task in the database and if it does so successfully, we redirect the user to the show page.
This time we simply use `redirect_to @task` (equivalent to task_url(@task)) as Rails automatically infers that.

Now, we have defined the update route as well as created an update action. Let's try clicking on the button this time.

![alt text](./../img/UpdateTask.png)

We see our new `description` of the task and the `id` remains the same as we simply updated an existing task.
