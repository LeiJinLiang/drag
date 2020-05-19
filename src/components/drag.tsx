import React, { FC , useRef } from 'react'
import styles from '../styles/drag.css'

export const Drag = () => {

    const ele = useRef<HTMLDivElement>(null)

    const handleDragStart = (ev: React.DragEvent) => {
        ev.persist()
        ev.dataTransfer.setData("application/my-app", 'p1') ;
        ev.dataTransfer.dropEffect = "move";
    }

    const handleDropOver = (ev : React.DragEvent) => {
        ev.preventDefault()
        ev.persist()
        ev.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (ev : any) => {
        ev.preventDefault()
        ev.persist()
        const data = ev.dataTransfer.getData("application/my-app");
        ev.target.appendChild(document.getElementById(data))
    }



    return (
        <>
            <p ref={ele} id="p1" draggable onDragStart={(e)=>{handleDragStart(e)}}>This element is draggable.</p>
            <div id="target" className={styles.container} onDrop={(e)=>{ handleDrop(e)}} onDragOver={(e)=>{ handleDropOver(e)}}>Drop Zone</div>
        </>
    )
}