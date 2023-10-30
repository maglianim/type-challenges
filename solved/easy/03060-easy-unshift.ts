/*
  3060 - Unshift
  -------
  by jiangshan (@jiangshanmeta) #easy #array

  ### Question

  Implement the type version of ```Array.unshift```

  For example:

  ```typescript
  type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
  ```

  > View on GitHub: https://tsch.js.org/3060
*/

/* _____________ Your Code Here _____________ */

/**
 * Here we test if _T_ type argument is a tuple and we infer its values into _Values_ type variable.
 * if the test is successful we return a new tuple whose first argument is _U_ and next has the spreading
 * of _Values_ type variable.
 */
type Unshift<T, U> = T extends [...infer Values] ? [U, ...Values] : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3060/answer
  > View solutions: https://tsch.js.org/3060/solutions
  > More Challenges: https://tsch.js.org
*/
