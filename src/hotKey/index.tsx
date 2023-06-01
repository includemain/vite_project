import React, { useState, useEffect } from 'react'
import { hotkey} from './hotkey2'


const HotKeyApp = ({setCount, count}) => {
    const ref = React.useRef<HTMLDivElement | null>(null)


      useEffect(() => {
        const ss = hotkey.bind(['command+c'], (e) => {
            e.preventDefault();
            // command+s 快捷键按下时需要执行的逻辑
            console.log('command+c');
            setCount(count + 1)
          })

          const left = hotkey.bind(['left'], (e) => {
            e.preventDefault();
            // command+s 快捷键按下时需要执行的逻辑
            console.log('left');
            setCount(count + 1)
          })
          const up = hotkey.bind(['up'], (e) => {
            e.preventDefault();
            // command+s 快捷键按下时需要执行的逻辑
            console.log('up');
            setCount(count + 1)
          })
          const right = hotkey.bind(['right'], (e) => {
            e.preventDefault();
            // command+s 快捷键按下时需要执行的逻辑
            console.log('right');
            setCount(count + 1)
          })
          const down = hotkey.bind(['down'], (e) => {
            e.preventDefault();
            // command+s 快捷键按下时需要执行的逻辑
            console.log('down');
            setCount(count + 1)
          })

          return () => {
            ss()
            down()
            up()
            left()
            right()
          }
      }, [count, setCount])
    
    return <div ref={ref} style={{backgroundColor: '#666'}}>
        快捷键{count}
    </div>
}

export default React.memo(HotKeyApp)