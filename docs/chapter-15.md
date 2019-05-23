---
id: chapter_15
title: Chapter 15 - Attaching files
---

Run following command in terminal

```bash
$ rails active_storage:install
```
then run

```bash
$ rails db:migrate
```

now create new model Attachment

```bash
$ rails g model Attachment attachable:references
```
Now open newly created migration file and edit like following.

```ruby
class CreateAttachments < ActiveRecord::Migration[5.2]
  def change
    create_table :attachments do |t|
      t.references :attachable, polymorphic: true, index: true

      t.timestamps
    end
  end
end
```
Save it and run `rails db:migrate`.

open attachment.rb file and edit like following.

```ruby
class Attachment < ApplicationRecord
  has_one_attached :doc
  belongs_to :attachable, polymorphic: true, optional: true
end
```

has_one_attached :doc tells the active storage attachment is attached with attachment model.

## 15.1 Since task and messages can have attachments to them, we'll introduce polymorphic association here.


## 15.2 Introduce Attachment model and have Task and Message as attachable.


## 15.3 We'll also introduce Attachable concern in Task and Message models and define association there.


## 15.4 Bind Attachment model with ActiveStorage.


## 15.5 Make necessary changes to Task form and controllers and build ability to attach files.
