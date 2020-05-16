import React, { FC , useRef } from 'react'

export const Drag = () => {

    const ele = useRef<HTMLDivElement>(null)

    const handleDragStart = (e: Event) => {
        console.log(ele.current)
        console.log('e',e)
    }

    return (
        <>
            <p ref={ele} draggable onDragStart={(e)=>{handleDragStart(event)}}>This element is draggable.</p>
        </>
    )
}