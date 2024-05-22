# ranked-pick-web

## Introduction

`ranked-pick-web` is the web client for [Ranked Pick](http://rankedpick.com), a web application for creating and responding to ranked choice style surveys.

API source can be found [here](https://github.com/carterjackson/ranked-pick-api).

## Development

### Docker

The service is run locally through [Docker](https://www.docker.com/) with [Docker Compose](https://docs.docker.com/compose/).

The `--service-ports` flag is required to open ports on the host.

```bash
docker compose run --service-ports rp-web
```

## Testing

TODO
