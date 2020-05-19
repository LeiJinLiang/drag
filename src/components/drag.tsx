import React, { FC , useRef } from 'react'
import styles from '../styles/drag.css'

export const Drag = () => {

    const ele = useRef<HTMLDivElement>(null)

    // drop 放
    const handleDropOver = (ev : React.DragEvent) => {
        ev.preventDefault()
        ev.persist()
        ev.dataTransfer.dropEffect = 'copy'
    }

    const handleDrop = (ev : any) => {
        ev.preventDefault()
        ev.persist()
        const data = ev.dataTransfer.getData("application/my-app");
        data && ev.target.appendChild(document.getElementById(data))
    }

    // drag 拖
    const handleDragStart = (ev: React.DragEvent) => {
        ev.persist()
        ev.dataTransfer.dropEffect = "none";
        ev.dataTransfer.setData("application/my-app", 'p1') ;
        
    }

    const handleDrag = (ev : any) => {
        ev.preventDefault()
        ev.persist()
        const { clientX, pageX, clientY } = ev 
        const { width } = window.screen
        const w = ele.current.offsetWidth
        ev.dataTransfer.dropEffect = "copy";
        if(clientX>width){
            ev.currentTarget.style.left = `${width-w}px` 
        }else{
            ev.currentTarget.style.left = `${clientX}px` 
        }
        ev.currentTarget.style.top = `${clientY}px`
      
    }

    const handleDragEnd = (ev : any) => {
        ev.preventDefault()
        ev.persist()
        const { clientX, pageX, clientY } = ev 
        const { width } = window.screen
        const w = ele.current.offsetWidth
        ev.dataTransfer.dropEffect = "none";
        if(clientX+w>width){
            ev.currentTarget.style.left = `${width-w}px` 
        }else{
            ev.currentTarget.style.left = `${clientX}px` 
        }
      
        ev.currentTarget.style.top = `${clientY}px` 
    }


    return (
        <>
            <p 
                ref={ele} 
                id="p1" 
                className={styles.drag}
                draggable 
                onDragStart={(e)=>{handleDragStart(e)}}
                onDrag={(e)=>{ handleDrag(e)}}
                onDragEnd = {(e)=>{ handleDragEnd(e)}}
            >
                    This element is draggable.
            </p>
            <div id="target" className={styles.container} onDrop={(e)=>{ handleDrop(e)}} onDragOver={(e)=>{ handleDropOver(e)}}><p>Drop Zone</p></div>
        </>
    )
}