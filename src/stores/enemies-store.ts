import { create } from "zustand";
interface IEnemiesStore {
    angle : number;
    setAngle : (angle : number) => void;
}

export const useEnemiesStore = create<IEnemiesStore>()((set) => ({
    angle : 0,
    setAngle: (angle : number) => set(() => ({ angle: angle})),
}))


