import React, { useState, useEffect } from 'react'
import { hotkey} from './hotkey2'


const HotKeyApp = () => {
    const [num, setNum] = useState(0)
    hotkey.bind(['command+s', 'command+y'], (e) => {
        e.preventDefault();
        // command+s 快捷键按下时需要执行的逻辑
        console.log('c+s');
        setNum(num + 1)
      });
    
    return <div>
        快捷键{num}
    </div>
}

export default React.memo(HotKeyApp)