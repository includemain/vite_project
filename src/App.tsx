import { useEffect, useRef, useState } from 'react'
import HotKeyApp from './hotKey'
import HotKeyApp2 from './hotKey/index2'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import CashRequest from './cashRequest'


import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const domRef = useRef<HTMLDivElement>(null)
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>()

  // 初始化editer
  useEffect(() => {
    if (domRef.current) {
      // 设置代码编辑器颜色
      editor.current = monaco.editor.create(domRef.current, {
        value: 'codecode',
        // parser: 'json',
        language: 'javascript',
        // readOnly: true,
        // domReadOnly: true,
        minimap: {
          enabled: false // 是否启用预览图
        } // 预览图设置
      })

      return () => {
        editor.current?.dispose()
      }
    }
  }, [])

  return (
    <div>
      {
        count < 3 ? <HotKeyApp setCount={setCount} count={count}></HotKeyApp> : 
        <HotKeyApp2 setCount={setCount} count={count}></HotKeyApp2>
      }

      {/* <div>
        这里有个input，我不希望触发
        <input type="text" />
      </div>

      <div
            style={{
              width: '100%',
              height: 500,
              background: '#F5F7FA',
              borderRadius: 2,
              marginTop: 20
            }}
            ref={domRef}
          /> */}

<CashRequest></CashRequest>
    </div>
  )
}

export default App
