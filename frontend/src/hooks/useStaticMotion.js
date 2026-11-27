import { useSyncExternalStore } from "react";

function createMediaHook(query) {
  const media = window.matchMedia(query);
  function subscribe(notify) {
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  }

  return function useMediaMatch() {
    return useSyncExternalStore(subscribe, () => media.matches);
  };
}

export const useStaticMotion = createMediaHook("(prefers-reduced-motion: reduce)");
export const useMobileLayout = createMediaHook("(max-width: 760px), (hover: none) and (pointer: coarse)");
