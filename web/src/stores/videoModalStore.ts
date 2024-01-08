import { Action, action, createStore, createTypedHooks } from "easy-peasy";

export interface VideoModalStoreState {
  seekToMs: number;
  seekTo: Action<VideoModalStoreState, number>;
}

const videoModalStore = createStore<VideoModalStoreState>({
  seekToMs: -1,
  seekTo: action((state, ms) => {
    return {
      ...state,
      seekToMs: ms,
    };
  }),
});

const typedHooks = createTypedHooks<VideoModalStoreState>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default videoModalStore;
