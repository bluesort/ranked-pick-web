# ranked-pick-web

## Introduction

`ranked-pick-web` is the web client for [Ranked Pick](http://rankedpick.com), a web application for creating and responding to ranked choice style surveys.

API source can be found [here](https://github.com/carterjackson/ranked-pick-api).

## Development

The service is run locally with [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

The `--service-ports` flag is required to open ports to localhost.

```bash
docker compose run --service-ports rp-web
```

Navigate to http://localhost:8000 to view the now running client.

## Testing

TODO
