# Home Creator API

This sample application allows a user to create a home by uploading a CSV file to an endpoint.

## Plans and Features

Here are the things I was able to complete in a few hours, and a long list of things I would have liked to do.

- [x] Linter and editor configuration is implemented for style
- [ ] JWT auth tokens protect the API
- [x] API is self-documenting by formatting with SIREN
- [x] A user can add a new home by sending a JSON post request to `api/home`
  - [ ] The data is cleaned and coerced to the correct format
  - [x] The data is validated to ensure correct formatting
  - [x] The data is stored in a Dynamo table
- [ ] A user can add multiple new homes by uploading a CSV file to `POST api/homes`
  - [ ] The CSV file is stored in S3
  - [ ] The S3 `PUT` triggers a lambda that deserializes, cleans, and coerces the data
  - [ ] The user receives an error if the CSV file cannot be parsed or is not valid
  - [ ] The resulting homes are unpacked and added to Dynamo
- [ ] A user can view a paginated list of homes that have been uploaded via `GET api/homes/:page?`
  - [ ] Invalid pages are coerced to be correct
- [x] A user can view a home by sending a GET request to `api/home/:homeId`
  - [x] The user receives a `404` if the home id isn't found
  - [x] The user receives a general error if another problem happened
  - [x] The user receives a JSON response representing the home
- [x] The application deploys with automation
  - [x] A developer can deploy the application from the command line
  - [x] A developer can remove a deployment from the command line
  - [ ] Continuous deployment occurs when pushing to `main`
- [x] The application is tested with automated tests
  - [x] Unit tests exist for the validator
  - [ ] A Github workflow tests before merging
  - [ ] Unit tests exist for each lambda handler
  - [ ] Integration tests exist for each major workflow, designed to run post deployment
  - [ ] Postman smoke tests exist for each endpoint
- [ ] Add logging

## Development

### Installation

```sh
git clone git@github.com:zinabat/home-creator.git
cd home-creator
npm install
```

### Deployment

`npm run deploy`

To destroy the stack, run `npm run undeploy`

### Lint

`npm run lint`

### Testing

To run unit tests:

`npm run test`

## API Reference

### `GET https://<api>.execute-api.<region>.amazonaws.com/<stage>/`

Root endpoint to ensure API is running.

#### Example Response

```json
{
    "class": [
        "root"
    ],
    "actions": [
        {
            "name": "create-home",
            "method": "POST",
            "href": "https://<gateway-id>.execute-api.us-east-1.amazonaws.com/dev/home",
            "type": "application/json",
            "fields": [
                {
                    "name": "address",
                    "type": "text"
                },
                {
                    "name": "city",
                    "type": "text"
                },
                {
                    "name": "province",
                    "type": "text"
                },
                {
                    "name": "type",
                    "type": "text"
                },
                {
                    "name": "zone",
                    "type": "text"
                }
            ]
        },
        {
            "name": "get-home",
            "method": "GET",
            "href": "https://<gateway-id>.execute-api.us-east-1.amazonaws.com/dev/home",
            "type": "application/json",
            "fields": [
                {
                    "name": "homeId",
                    "type": "text"
                }
            ]
        }
    ],
    "links": [
        {
            "rel": [
                "self"
            ],
            "href": "https://<gateway-id>.execute-api.us-east-1.amazonaws.com"
        }
    ]
}
```

### `POST https://<api>.execute-api.<region>.amazonaws.com/<stage>/home`

Creates a home given some data. Returns the entity of the home as a response if successful

#### Example Response

```json
{
    "class": [
        "home"
    ],
    "links": [
        {
            "rel": [
                "self"
            ],
            "href": "https://<api>.execute-api.<region>.amazonaws.com/<stage>/home/<homeid>"
        }
    ],
    "properties": {
        "address": "some address",
        "city": "some city",
        "province": "some province",
        "type": "detached",
        "zone": "residential"
    }
}
```

### `GET https://<api>.execute-api.<region>.amazonaws.com/<stage>/home/<homeId>`

Returns a home given an id.

#### Example Response

```json
{
    "class": [
        "home"
    ],
    "links": [
        {
            "rel": [
                "self"
            ],
            "href": "https://<api>.execute-api.<region>.amazonaws.com/<stage>/home/<homeid>"
        }
    ],
    "properties": {
        "address": "some address",
        "city": "some city",
        "province": "some province",
        "type": "detached",
        "zone": "residential"
    }
}
```
