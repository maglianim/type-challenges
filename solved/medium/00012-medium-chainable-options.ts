/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #medium #application

  ### Question

  Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?

  In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.

  For example

  ```ts
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```

  You don't need to write any js/ts logic to handle the problem - just in type level.

  You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.

  > View on GitHub: https://tsch.js.org/12
*/

/* _____________ Your Code Here _____________ */

/**
 * To implement Chainable Operator we operate as follows:
 * 
 *  - 1: First of all, declare Chainable itself as a generic; the _O_ type is used to store the accumulated properties
 *  - 2: in options we extract key and value types by putting as type argument
 *  - 3: we put K the constraint to extend string in order to be a valid property key
 *  - 4: we declare key type as a conditional type: if is a key of O it defaults to never in order to prevent assigning twice the same key
 *  - 5: we return an intersection type between the current value of O and a record with the given property/key couple
 *  - 6: we use Omit<O, K> to suppress a given key of O in case it has been declared again (note this only for the challenge as never type documented at point _4_ already prevents this possibility).
 */


type Chainable<O = {}> = {
  option<K extends string, V>(key: K extends keyof O ? never : K, value: V): Chainable<Omit<O, K> & Record<K, V>>;
  get(): O;
}

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'
import { cachedDataVersionTag } from 'v8'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()


const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/12/answer
  > View solutions: https://tsch.js.org/12/solutions
  > More Challenges: https://tsch.js.org
*/
