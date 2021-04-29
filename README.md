# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### CRUD operations:
#### Create:
>POST /reviews
>>Entire review object must be in request body<br>
>>Data must strictly conform to schema
#### Read:
>GET /reviews
>>body must contain _id of review to read
#### Update:
>PUT /reviews
>>Entire review object must be in request body<br>
>>Request body must conform to schema and have _id property of object to update
#### Delete:
>DELETE /reviews
>>_id must be in request body

## Requirements



## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

