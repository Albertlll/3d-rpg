import { createEvent, createStore, sample } from "effector";


const $joystickPosition = createStore({
    forward: false,
    backward: false,
    left: false,
    right: false,
});

const setJoystickPosition = createEvent<{
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
}>();

sample({
    clock: setJoystickPosition,
    target: $joystickPosition,
}); 