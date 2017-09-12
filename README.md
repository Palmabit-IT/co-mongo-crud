# lambda mongo crud

Crud with mongoDb and co

## Installation

```
npm install co-mongo-crud --save
```

## Usage

```js
const Crud = require('co-mongo-crud').Crud
const buildQueryOptions = require('co-mongo-crud').buildQueryOptions

const posts = new Crud('stringConnection', 'posts')

const options = buildQueryOptions('querystringparams', [])

crud.list(options, (err, docs) => {} )

```

## Tests
```
npm test
```

### Coverage

```
npm run-script test-travis
```

## Author

[Palmabit](https://palmabit.com)

## License

[MIT license](LICENSE)