/*
  3057 - Push
  -------
  by jiangshan (@jiangshanmeta) #easy #array

  ### Question

  Implement the generic version of ```Array.push```

  For example:

  ```typescript
  type Result = Push<[1, 2], '3'> // [1, 2, '3']
  ```

  > View on GitHub: https://tsch.js.org/3057
*/

/* _____________ Your Code Here _____________ */

/**
 * Here we test if _T_ type argument is a tuple and we infer its values into _Values_ type variable.
 * if the test is successful we return a new tuple whose first arguments are the spreading of _Values_ type variable,
 * then _U_ is put as last value.
 */
type Push<T extends any, U> = T extends [...infer Values] ? [...Values, U] : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3057/answer
  > View solutions: https://tsch.js.org/3057/solutions
  > More Challenges: https://tsch.js.org
*/
