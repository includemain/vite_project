import React, { useState, useEffect } from 'react'
import { hotkey} from './hotkey2'


const HotKeyApp2 = ({setCount, count}) => {
    const ref = React.useRef<HTMLDivElement | null>(null)


      useEffect(() => {
        const ss = hotkey.bind(['command+v'], (e) => {
            e.preventDefault();
            // command+s 快捷键按下时需要执行的逻辑
            console.log('我这里打印的不提样--command+v');
            setCount(count + 1)
          })
          return ss
      }, [count, setCount])
    
    return <div ref={ref} style={{backgroundColor: '#666'}}>
        快捷键{count}
    </div>
}

export default React.memo(HotKeyApp2)