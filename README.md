# Project Name

SDC Team Mediator

## Related Projects

  - https://github.com/teamName/repo


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage


### Cassandra:
 #### Request Body:
> listingID int, <br>
> id int, <br>
> dateJoined text, <br>
> profilePic text, <br>
> reviewDescription text, <br>
> userName text <br>
> reviewRating { <br>
>> cleanliness, int <br>
>> cleanliness, int <br>
>> communication, int <br>
>> checkIn, int <br>
>> accuracy, int <br>
>> location, int <br>
>> value, int, <br>}
* #### Create:
> * POST /cassandrareviews
>>request body requires listingID and id property, all others are optional
* #### Read:
> * GET /cassandrareviews
>>request body requires listingID property
* #### Update:
> * PUT /cassandrareviews
>> request body requires listingID and id property, all others are optional  <br>
>> request body example:  <br>
>>{listingID: int, id: int, update: {keysToUpdate: valuesToUpdate}} <br>
>> * If any reviewRating properties are to be updated, all must be updated
* #### Delete:
>* * DELETE /cassandrareviews
>> request body requires listingID and id property


### Postgres
#### Request Body:
> id: type: Sequelize.INTEGER, <br>
> user_name: Sequelize.STRING, <br>
> date_joined: Sequelize.STRING, <br>
> profile_pic: Sequelize.STRING, <br>
> review_description: Sequelize.STRING, <br>
> cleanliness: Sequelize.INTEGER, <br>
> communication: Sequelize.INTEGER, <br>
> checkin: Sequelize.INTEGER, <br>
> accuracy: Sequelize.INTEGER, <br>
> location: Sequelize.INTEGER, <br>
> value: Sequelize.INTEGER, <br>
> listing_id: Sequelize.INTEGER, <br>
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
>>id must be in request body

## Requirements



## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run
```

