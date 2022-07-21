export type Action<TResult, TArgs extends any[]> = (...args: TArgs) => Promise<TResult | undefined>

export type ActionHandle<TResult, TActionArgs extends any[]> = {
  result: TResult | undefined
  running: boolean
  errored: boolean
  error: any | undefined
  resolve: AsyncResolve<TResult | undefined>
  run: Action<TResult, TActionArgs>
}

export type UseAction = <TResult, TActionArgs extends any[]>(
  action: Action<TResult, TActionArgs>
) => ActionHandle<TResult, TActionArgs>
export type AsyncResolve<TResult> = (result: TResult | undefined) => void
