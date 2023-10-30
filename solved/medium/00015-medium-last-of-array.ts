/*
  15 - Last of Array
  -------
  by Anthony Fu (@antfu) #medium #array

  ### Question

  > TypeScript 4.0 is recommended in this challenge

  Implement a generic `Last<T>` that takes an Array `T` and returns its last element.

  For example

  ```ts
  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type tail1 = Last<arr1> // expected to be 'c'
  type tail2 = Last<arr2> // expected to be 1
  ```

  > View on GitHub: https://tsch.js.org/15
*/

/* _____________ Your Code Here _____________ */

/**
 * we constraint type argument T to extend a tuple.
 * then we test T against an array inferring the _rest (in this case unused) with spread operator
 * and isolating the _last_ element using infer as well. then _last_ is returned if everything
 * matches otherwise  never is provided
 */
type Last<T extends readonly any[]> = T extends [...infer _rest, infer last] ? last : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/15/answer
  > View solutions: https://tsch.js.org/15/solutions
  > More Challenges: https://tsch.js.org
*/
