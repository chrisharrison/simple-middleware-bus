# simple-middleware-pipeline

A simple Typescript middleware pipeline.

## Installation

```bash
yarn add @chrisharrison/simple-middleware-pipeline
```

## Usage

First you need to setup a new pipeline:

```typescript
import { Pipeline } from '@chrisharrison/simple-middleware-pipeline';

const pipeline = new Pipeline([]);
```

You then run whatever you want to wrap middleware around via the pipeline:

```typescript
const base = () => 'hello world';

const result = pipeline.run(base);

console.log(result);
```

Because no middleware has been added to the pipeline yet, this will output:

```typescript
"hello world"
```

The following type describes middleware implementation:

```typescript
type Middleware = (next: (...args: any[]) => any, ...rest: any) => any;
```

So an example middleware might be:

```typescript
const uppercaseMiddleware = (next: () => any): string => {
    const incoming = next();
    if (typeof incoming === 'string') {
        return incoming.toUpperCase();
    }
    return '';
};
```

You would then add the middleware to the pipeline like so:

```typescript
const pipeline = new Pipeline([uppercaseMiddleware]);
```

Running the pipeline now would produce:

```
"HELLO WORLD"
```

### Dealing with arguments

Middleware can also pickup and modify arguments passed to the initial function:

```typescript
const argumentModifyingMiddleware = (next: (name: string) => string, name: string): string => {
    return next(name.toUpperCase());
};

const pipeline = new Pipeline([argumentModifyingMiddleware]);

const result = pipeline.run((name: string) => `Hello, ${name}. Nice to meet you.`, 'matthew');

console.log(result);
```

produces:

```
"Hello, MATTHEW. Nice to meet you."
```

## Testing

Tests are written with Jest. Specifications live next to the system under test (i.e. the test file goes next to the file it's testing).

To run tests:

```bash
yarn test
```