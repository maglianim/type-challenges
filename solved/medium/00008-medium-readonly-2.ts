/*
  8 - Readonly 2
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys

  ### Question

  Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.

  `K` specify the set of properties of `T` that should set to Readonly. When `K` is not provided, it should make all properties readonly just like the normal `Readonly<T>`.

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  todo.completed = true // OK
  ```

  > View on GitHub: https://tsch.js.org/8
*/

/* _____________ Your Code Here _____________ */

// NOTE: here we omit properties from T because intersection type works as "and" operator for each property, and has changed behaviour from ypescript 4.5+:
// for example { a: number } & { readonly a: number }
// on typescript < 4.5 results in: { readonly a: number }
// on typescript >= 4.5 results in: { a: number }
// omitting changed properties make a more predictable result

/**
 * ***Explanation:***
 * 
 * First, we set K as keyof T to specify the desidered readonly keys, then we default it to the full keyof of T
 * in order to consider all keys of T if K is not specified.
 * We implemented a mapped type where all the keys of K are created with the _readonly_ modifier.
 * ***NOTE:*** Here we omit properties from T because intersection type works as "and" operator for each property,
 * and the way on how every property is intersected has changed since typescript 4.5+.
 * Taking this intersecion as an exemple _{ a: number } & { readonly a: number }_, the result has changed as follows:
 * - prior to typescript 4.5 it resulted in _{ readonly a: number }_
 * - from typescript 4.5 it results in _{ a: number }_
 * 
 * the choice to omit the property not marked as readonly explicitly gives the same predictable result regardless what 
 * version of typescript is used.
 */
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> & {
  readonly [key in K]: T[key];
};


/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/
