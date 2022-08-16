import { mean } from 'lodash'

function anovafscore(args: number[][]): number {
  let expVar, sampSampMean, tmpargs, unexpVar, i, j
  if (args.length === 1) {
    tmpargs = new Array(args[0].length)
    for (i = 0; i < args[0].length; i++) {
      tmpargs[i] = args[0][i]
    }
    args = tmpargs
  }
  // Builds sample array
  let sample: number[] = []
  for (i = 0; i < args.length; i++) {
    sample = sample.concat(args[i])
  }
  const sampMean = mean(sample)
  // Computes the explained variance
  expVar = 0
  for (i = 0; i < args.length; i++) {
    expVar = expVar + args[i].length * Math.pow(mean(args[i]) - sampMean, 2)
  }
  expVar /= args.length - 1
  // Computes unexplained variance
  unexpVar = 0
  for (i = 0; i < args.length; i++) {
    sampSampMean = mean(args[i])
    for (j = 0; j < args[i].length; j++) {
      unexpVar += Math.pow(args[i][j] - sampSampMean, 2)
    }
  }
  unexpVar /= sample.length - args.length
  return expVar / unexpVar
}

function gammaln(x: number): number {
  let j = 0
  const cof = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]
  let ser = 1.000000000190015
  let xx, y, tmp
  tmp = (y = xx = x) + 5.5
  tmp -= (xx + 0.5) * Math.log(tmp)
  for (; j < 6; j++) ser += cof[j] / ++y
  return Math.log((2.5066282746310005 * ser) / xx) - tmp
}

function betacf(x: number, a: number, b: number): number {
  const fpmin = 1e-30
  let m = 1
  const qab = a + b
  const qap = a + 1
  const qam = a - 1
  let c = 1
  let d = 1 - (qab * x) / qap
  let m2, aa, del, h

  // These q's will be used in factors that occur in the coefficients
  if (Math.abs(d) < fpmin) d = fpmin
  d = 1 / d
  h = d

  for (; m <= 100; m++) {
    m2 = 2 * m
    aa = (m * (b - m) * x) / ((qam + m2) * (a + m2))
    // One step (the even one) of the recurrence
    d = 1 + aa * d
    if (Math.abs(d) < fpmin) d = fpmin
    c = 1 + aa / c
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    h *= d * c
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2))
    // Next step of the recurrence (the odd one)
    d = 1 + aa * d
    if (Math.abs(d) < fpmin) d = fpmin
    c = 1 + aa / c
    if (Math.abs(c) < fpmin) c = fpmin
    d = 1 / d
    del = d * c
    h *= del
    if (Math.abs(del - 1.0) < 3e-7) break
  }

  return h
}

function ibeta(x: number, a: number, b: number): number {
  // Factors in front of the continued fraction.
  const bt = x === 0 || x === 1 ? 0 : Math.exp(gammaln(a + b) - gammaln(a) - gammaln(b) + a * Math.log(x) + b * Math.log(1 - x))
  if (x < 0 || x > 1) return 0
  if (x < (a + 1) / (a + b + 2))
    // Use continued fraction directly.
    return (bt * betacf(x, a, b)) / a
  // else use continued fraction after making the symmetry transformation.
  return 1 - (bt * betacf(1 - x, b, a)) / b
}

function cdf(x: number, df1: number, df2: number): number {
  if (x < 0) return 0
  return ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2)
}

export default function anovaftest(args: number[][]) {
  let n, i
  const anovafscoreR = anovafscore(args)
  const df1 = args.length - 1
  n = 0
  for (i = 0; i < args.length; i++) {
    n = n + args[i].length
  }
  const df2 = n - df1 - 1
  return 1 - cdf(anovafscoreR, df1, df2)
}
