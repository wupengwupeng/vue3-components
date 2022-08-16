/* Returns the discrete, linear convolution of two vectors.
** Convolution in time/space is equivalent to multiplication in the frequency domain.
This function is equivalent to numpy's convolve function with the default 'full' parameter
example :
------
vec1 = [2,3,4]
vec2 = [1,2,3]
multiply vec2 by vec1[0] = 2    4   6
multiply vec2 by vec1[1] = -    3   6   9
multiply vec2 by vec1[2] = -    -   4   8   12
-----------------------------------------------
add the above three      = 2    7   16  17  12
convolve(vec1, vec2) // [2,7,16,17,12]
**
*/

export const convolve = (vec1: number[], vec2: number[]) => {
  if (vec1.length === 0 || vec2.length === 0) {
    throw new Error('Vectors can not be empty!')
  }
  const volume = vec1
  const kernel = vec2
  let displacement = 0
  const convVec: number[] = []
  for (let i = 0; i < volume.length; i++) {
    for (let j = 0; j < kernel.length; j++) {
      if (displacement + j !== convVec.length) {
        convVec[displacement + j] = convVec[displacement + j] + volume[i] * kernel[j]
      } else {
        convVec.push(volume[i] * kernel[j])
      }
    }
    displacement++
  }
  return convVec
}
