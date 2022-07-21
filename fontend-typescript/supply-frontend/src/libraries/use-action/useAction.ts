import { Action, UseAction } from "./types";
import { useAsync } from "../use-async";

export const useAction: UseAction = <TResult, TActionArgs extends any[]>(
  action: any
) => {
  const handle = useAsync<TResult>();

  const run: Action<TResult, TActionArgs> = async (...args) => {
    return handle.reload(() => {
      return action(...args);
    });
  };

  return {
    running: handle.loading,
    errored: handle.errored,
    error: handle.error,
    result: handle.result,
    resolve: handle.resolve,
    run,
  };
};
