'use client'
import { useEffect, useRef } from "react"
import { app } from "./options/app"
import { App } from "./functions/App"
import styles from './styles/styles.module.scss'

export default function Canvas() {
    const rendererEl = useRef<HTMLDivElement>();

    useEffect(() => {
        app.canvas = new App({
            rendererEl: rendererEl.current
        })

        return () => {
            if (app.canvas) {
                app.canvas.destroy();
                app.canvas = null;
            }
        }
    }, [])
    
    return (
        <div className={styles.rendererEl} ref={rendererEl}></div>
    )
}