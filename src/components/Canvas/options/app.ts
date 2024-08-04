import { App } from "canvas/functions/App";

export const app: { canvas: App } = {
    canvas: null!
}

export const appOptions = {
    frame: {
        DEFAULT_FPS: 60,
        DT_FPS: 16.666666666666668,
    },
    objects: {
        enemies: 10
    }
} as const;