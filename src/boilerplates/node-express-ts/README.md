# Project Title

A brief description of what this project does and who it's for.

## Stacks

**Server:** Node, Express, TypeScript

## Run Locally

Clone the project:

```bash
  git clone https://link-to-project
```

Go to the project directory:

```bash
  cd my-project
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run start
```

## Running Tests

To run tests, run the following command:

```bash
  npm run test
```

## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@octokatherine](https://www.github.com/octokatherine)

## Acknowledgements

- [readme.so](https://readme.so/)

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md]() for ways to get started.

Please adhere to this project's [Code of Conduct]().

## Support

For support, email fake@fake.com or join our Slack channel.
