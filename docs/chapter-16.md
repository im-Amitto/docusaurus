---
id: chapter_16
title: Chapter 16 - Introduction to Testing and Writing Unit Tests
---

## 16.1 Why write tests?
Testing is an important aspect of software development life cycle.
It is a means to ensure the quality of product is maintained.
When your applcation grows in size, you are likely to
refactor a lot of code. Writing tests will help us
ensure that changes made to the code adheres to the desired functionality.
Fortunately, Rails provides us a very easy and efficient way of writing tests.

## 16.2 Test setup
Whenever a new rails application is created using `rails new` command,
you will notice that there is a `test` directory automatically created.
This directory also has the following files and directories by default -
```msg
controllers
fixtures
helpers
integration
mailers
models
system
application_system_test_case.rb
test_helper.rb
```
It is implicit that the directories `controllers`, `helpers`, `mailers` and `models`
hold the code and files to test controllers, helpers, mailers and models
that we added in `app` directory respectively.
Files written `fixtures` are used to organize the data used for testing.
Integration tests are responsible to test interactions between controllers
while system tests are responsible to test the app as per user's experience
on a browser and includes testing Javascript code.
The file `test_helper.rb` holds the configuration for all the tests.
This file will be loaded in all the test files in order to load
the test configurations.
Similarly, `application_system_test_case.rb` holds the default configuration for system tests.
In this chapter we will focus on testing our `Task` model.

## 16.3 Testing Task model

Create a file named `task_test.rb` inside `test/models` directory.
It's a convention to use `_test` suffix for all test file names.
Now add the following code inside `task_test.rb`.

```ruby
require "test_helper"
class TaskTest < ActiveSupport::TestCase

end
```


So now, the class `TaskTest` can be called a test case because
it inherits from `ActiveSupport::TestCase`.
Now every method that Rails defines for testing is made available to `TaskTest` class.
By requiring `test_helper`, we have ensured the default configurations for testing are made available.
Let's explore some of the commonly used methods provided by Rails to test various scenarios.

### 16.3.1 Testing truth value
Testing is all about knowing if the expectations matches the actual behaviour.
We'll use `assert` function to test if a statement is true.

Let's define a simple method to test the class for an instance of Task.

```ruby

  def test_is_instance_of_task
    task = Task.new
    assert task.is_a?(Task) # See if object task actually belongs to Task
  end
```

Note that we start the name of the method with `test_`
so that the test runner understands that this method defines a test
and is not just any other function defined in the class.

Now let's observe how this test behaves.
Open your terminal and run the following command

```bash
$ rails test test/models/task_test.rb
Finished in 5.887601s, 0.6794 runs/s, 2.2080 assertions/s.
1 runs, 1 assertions, 0 failures, 0 errors, 0 skips
```

We can see the message that there was 1 run i.e., one test method executed.
The file successfully ran 1 assertion without any failures or errors.

Here, the expectation was that `task.is_a?(Task)` should return true.
This indeed happened and hence assertion passed.
Let's observe the behaviour for a case when expectation doesn't match the actual result.

Modify the method as following

```ruby
  def test_instance_of_task
    task = Task.new
    assert task.is_a?(User)
  end
```
Here we are expecting `task.is_a?(User)` to return true.
But this will fail because the object `task` was instantiated from `Task` class and not from `User`.
Let's run our test
```bash
$ rails test test/models/task_test.rb
TaskTest#test_instance_of_task
Expected false to be truthy.

Finished in 5.887601s, 0.6794 runs/s, 2.2080 assertions/s.
1 runs, 1 assertions, 1 failures, 0 errors, 0 skips
```

We can see that 1 assertion was run, but that resulted in failure.

One way of testing negation or false values is by using `refute` or `assert_not` methods.
Modify our test method as follows

```ruby

def test_not_instance_of_user
  task = Task.new
  assert_not task.is_a?(User)
end

```

Run `rails test` with file name and you should be able to see no failures this time.

### 16.3.2 Testing Equality

Add a new method to `task_test.rb` file to test description of the task

```ruby
class TaskTest < ActiveSupport::TestCase
...

  def test_value_of_description_assigned
    task = Task.new(description: "Description assigned for testing")

    assert task.description == "Description assigned for testing"
  end

...
end
```

If you run the `rails test` with the file name, you should see the test run successfully.
This is because the truth value of argument to `assert` method is `true`.
We can, however make this a little more readable by using `assert_equal` method.

So modify the assertion in the above method to the following

```ruby
  def test_value_of_description_assigned
    task = Task.new(description: "Description assigned for testing")

    assert_equal task.description, "Description assigned for testing"
  end
```

Analogous to `assert_not`, we can use `assert_not_equal` in cases where we want to test inequality.


### 16.3.3 Testing nil values

Add a method to `task_test.rb` file to test the created_at of the task record before it's saved.

```ruby
...
  def test_value_created_at
    task = Task.new(description: "This is a test task")
    assert_nil task.created_at

    task.save!
    assert_not_nil task.created_at
  end
...
```

In the above case we are asserting that the value of `created_at` attribute
should be nil when task is instantiated while it should have a not nil value
when the record is saved.
Verify the results by running `rails test test/models/task_test.rb`.


### 16.3.4 Testing errors
ActiveRecord in Rails provides a `find` method
that loads the record in memory of the passed id.
If no such record exists, it raises a `ActiveRecord::RecordNoFound` error.

Let's test how this behaviour can be tested.
Add the following method to the `task_test.rb` file

```ruby
...

  def test_error_raised
    assert_raises ActiveRecord::RecordNotFound do
      Task.find(SecureRandom.uuid)
    end
  end
...
```

`assert_raises` is a method that takes the names of error classes and a block.
It tests whether the block, when executed raises the error that was passed in the argument.
So in our example, we are testing if using `Task.find` with a random unique id raises a `ActiveRecord::RecordNotFound` error.

Needless to say, the results can be tested by running `rails test test/models/task_test.rb`.

### 16.3.5 Testing expressions
Let's test if creating a task has actually increased the number of records in the database.
Add the following code to the test file

```ruby
...
  def test_count_of_number_of_tasks
    assert_difference ->{Task.count} do
      Task.create!(description: "Creating a task through test")
    end
  end
...
```
Let's run `rails test test/models/task_test.rb`. You'll notice that all the tests ran without any error.

The above code tests that when the block is executed, the result of `Task.count` changes by 1.
Let's try adding another line of code to the above method. Modify this test and make it look as follows.
```ruby
  def test_count_of_number_of_tasks
    assert_difference ->{Task.count} do
      Task.create!(description: "Creating a task through test")
      Task.create!(description: "Creating another task through test")
    end
  end
```

Now run the test and observe the result
```bash
$ rails test test/models/task_test.rb
"Task.count" didn't change by 1.
Expected: 1
  Actual: 2
```
In the above case the block inside `assert_difference` has actually created two task records,
but we're asserting that it had created only one. So how do we test this?
Fortunately for us `assert_difference` helps us pass the count to evaluate
the difference in the results of the expression. Modify the method as follows and run the tests.
```ruby
  def test_count_of_number_of_tasks
    assert_difference ->{Task.count}, 2 do
      Task.create!(description: "Creating a task through test")
      Task.create!(description: "Creating another task through test")
    end
  end
```
The above code will not result in test failure as we are asserting
that `Tsak.count` has changed by 2 when the block was executed.

In order to test that an expression has not changed, we can use `assert_no_difference` method.

Rails provides a larger array of methods for testing and we haven't covered we haven't covered them all in this chapter.
The idea was to walk through how testing can be done and describe some of the methods that you are most likely to use in the testing.

## 16.4 A few gotchas of testing
### 16.4.1 The setup method
Every public method written in a test file that starts with `test_` is a test case.
As our application grows, we'll have a lot of test cases and these test cases
may require a some data to be loaded as part of getting things ready for testing.
To load any such configuration, or to carry out any operation that is common
to all the tests in the class, we make use of `setup` method.

So let's add a setup method to our `TaskTest` class.

```ruby
class TaskTest < ActiveSupport::TestCase
  ...
  def setup
    Task.delete_all
  end
  ...
end
```
What's happening here is that all the records in `tasks` table get deleted before every test case is executed.

### 16.4.2 Writing tests in blocks instead of methods
In order to have a better readability, we can modify our tests as follows

```ruby
  test "error raised" do
    assert_raises ActiveRecord::RecordNotFound do
      Task.find(SecureRandom.uuid)
    end
  end
```

This gives the exact behaviour to that of the method `test_error_raised` that we had written in *16.3.4*.

### 16.4.3 Executed a single test
Everytime we run `rails test test/models/task_test.rb`,
we notice that all the tests in the file are run.
Now go to task_test.rb, and choose a test of your choice.
Let's say you selected the first test that we added `test_is_instance_of_task`.
Note down the line number in file where this test is starting. Let's assume that line number is 10.
Now run the following command in the terminal
```bash
$ rails test test/models/task_test.rb:10
```
Voila! We see that only one test is run, which is `test_is_instance_of_task`.
That's because we have appened `:10` in the end of the command to run the test.
It means, we are asking Rails to run only the test whose code is present in line number 10.
Observe the behaviour by making changes to this number while running the test.
