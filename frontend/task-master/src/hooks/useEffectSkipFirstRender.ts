import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export const useEffectSkipFirstRender = (
  effect: EffectCallback,
  deps: DependencyList,
) => {
  const render = useRef(true);

  useEffect(() => {
    if (render.current) {
      render.current = false;
    }
    return effect();
  }, deps);
};
