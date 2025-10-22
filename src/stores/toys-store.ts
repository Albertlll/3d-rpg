import { createEvent, createStore, sample } from "effector";
import type { RigidBodyApi } from "@react-three/rapier";

export type ToyRecord = {
  id: string;
  api: RigidBodyApi;
  grabbed: boolean;
};

type ToysMap = Record<string, ToyRecord>;

const $toys = createStore<ToysMap>({});

const registerToy = createEvent<{ id: string; api: RigidBodyApi }>();
const unregisterToy = createEvent<{ id: string }>();
const setToyGrabbed = createEvent<{ id: string; grabbed: boolean }>();

sample({
  clock: registerToy,
  source: $toys,
  fn: (map, { id, api }) => ({
    ...map,
    [id]: { id, api, grabbed: false },
  }),
  target: $toys,
});

sample({
  clock: unregisterToy,
  source: $toys,
  fn: (map, { id }) => {
    const copy = { ...map };
    delete copy[id];
    return copy;
  },
  target: $toys,
});

sample({
  clock: setToyGrabbed,
  source: $toys,
  fn: (map, { id, grabbed }) => ({
    ...map,
    [id]: map[id] ? { ...map[id], grabbed } : map[id],
  }),
  target: $toys,
});

export { $toys, registerToy, unregisterToy, setToyGrabbed };

