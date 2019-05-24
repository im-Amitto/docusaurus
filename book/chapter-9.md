When a blog is created then we might want to generate a permanent url for the blog.
Similarly when someone changes the password then we might want to send an email to the user that password has been changed.

Such business cases can be achieved if we register some methods that need to be executed by Active Record whenever something changes in the model.

## List of Callbacks

Active Record Callbacks are methods that the library allows us to register in our models.
They provide hooks in various stages of transaction.
The following is the list of callbacks when an object is created.
These are executed in the order mentioned below.

```msg
before_validation
after_validation
before_save
around_save
before_create
around_create
after_create
after_save
after_commit/after_rollback
```

As you would imagine, the `before_create`, `around_create` and `after_create`
are replaced by `before_update`, `around_update` and `after_update` respectively when records are updated.

Active Record provides only four callbacks when records are `destroyed`. They are invoked in the following order

```msg
before_destroy
around_destroy
after_destroy
after_commit/after_rollback
```


## Registering Callbacks

### Using callbacks for validations

In the previous chapter, we had introduced a validation to ensure the task has description.
Let's try and modify value of `description` attribute through callbacks and observe the behaviour.

Open `Task` model and add following lines of code

```ruby
class Task < ApplicationRecord
  # ... existing validations

  # Register a before_validation callback named assign_description
  before_validation :assign_description

  # Define assign_description method
  def assign_description
    self.description = "Hey! I got assigned in a callback"
  end

  # ... existing methods
end
```

Now open Rails console and run the following

```msg
task = Task.new
Task.valid?

#=> true
```

As you can see, `valid?` returned `true`. That means there was description set before the validations ran.
Let's verify if the value was actually set on the record.

```msg
task.description
#=> "Hey! I got assigned in a callback"
```

Yay! The task record has description set internally through the callback.
Now comment out the line where callback was registered, and register the same method in an `after_validation` callback.

```ruby
# before_validation :assign_description
after_validation :assign_description
```
Open Rails console and observe the following

```msg
task = Task.new
task.description
#=> nil

task.valid?
#=> false

task.description
#=> "Hey! I got assigned in a callback"
```
Interesting, isn't it! The validation has failed and returned `false` but we still have a description assigned.
That's because the attribute was assigned after the validations were run.
And as you would expect, creation of task record should fail here.

```msg
Task.create!
#=> ActiveRecord::RecordInvalid: Validation failed: Description enter a value for Description
```

### Using callbacks for saving data

Modify the `Task` model to enable before_validation again
```ruby
before_validation :assign_description

# Comment out after_validation callback
# after_validation :assign_description
```
Add a before_save callback to reassign the description.
Make sure you also have your `before_validation` callback that was enabled above as well.

```ruby
class Task < ApplicationRecord
  # ... existing validations and callbacks

  before_save :reassign_description

  # Define assign_description method
  def reassign_description
    self.description = "Hey! I got reassigned in another callback"
  end

  # ... existing methods
end
```

Open Rails console and run the following

```msg
task = Task.new
task.valid?
#=> true

task.description
#=> "Hey! I got assigned in a callback"

task.save!
task.description
#=> "Hey! I got reassigned in another callback"
```

Let's look at the value stored in the database.
```msg
task = Task.order(created_at: :desc).first
task.description
#=> "Hey! I got reassigned in another callback"
```
As you see, the value stored in database that we have set from `before_save` callback.
Similar results will be observed if you use `before_create`.

Callbacks like `after_create`, `after_save` and `after_commit` will have a different behaviour in above scenarios.
Comment out existing `before_save` callback and enable `after_save` for same method.
```ruby
# before_save :reassign_description
after_save :reassign_description
```

Observe results in Rails console.

```msg
task = Task.create!
task.description
#=> "Hey! I got reassigned in another callback"

task = Task.last
task.description
#=> "Hey! I got assigned in a callback"
```
The task object returned after creation has description updated from the `after_save` callback.
But the value in the database is the one that was set from our `before_validation` callback.

### after_save vs after_commit

There is a slight but important difference between `after_save` and `after_commit` callbacks.
`after_commit` is invoked when transaction reaches `Committed` state.
So if there are cases where some checks made by database recovery system fails, we'll not
have `after_commit` callback invoked but might have had `after_save` run by then.
So if the requirement to carry out an operation only after transaction is complete,
then we should use `after_commit` instead of `after_save`.

### Triggering multiple callbacks of same type

We can register multiple methods for a callback.
They will be chained up and executed in the same order in which they are registered.
Let's have two `before_save` callbacks in our `Task` model.

```ruby
class Task < ApplicationRecord

  before_validation :assign_description
  before_validation :print_assigned_description

  def print_assigned_description
    puts self.description
  end
end

```

Reload Rails console and observe the following.

```msg
task = Task.new
task.description
#=> nil

task.valid?
#=> "Hey! I got assigned in a callback"
```

What happened here is when `valid?` method was called,
`assign_description` was called first and value was assigned to the attribute.
Then `print_assigned_description` was called and the assigned value is printed.


## Conditionally triggering the callbacks

Let's modify our `before_validation` callback as follows

```ruby
before_validation :assign_description, if: :description_not_present

# Define the method provided in the condition for callback
def description_not_present
  self.description.blank?
end
```
Here we are making sure the description is assigned only when `description_not_present` method returns `true`.
Let's verify the results in Rails console.

```msg
task = Task.new("This is a sample task")
task.valid?
#=> true

task.description
#=> "This is a sample task"
```
As we can see, value of the attribute is not assigned from the `before_validation` callback.

We can similarly use `unless:` option to trigger callback when a negative condition is provided.

```ruby
before_validation :assgin_description, unless: :description_present

def description_present
  self.description.present?
end
```

## When are these callbacks triggered?

The following methods when called on an Active Record object trigger the above described callbacks.

```msg
create
create!
destroy
destroy!
destroy_all
save
save!
save(validate: false)
toggle!
touch
update_attribute
update
update!
valid?
```

The callbacks are NOT triggered when following methods are called.

```msg
decrement
decrement_counter
delete
delete_all
increment
increment_counter
toggle
update_column
update_columns
update_all
update_counters
```
