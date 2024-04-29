import {GridContainer, GridItem} from "./lib/main.ts";
import './App.css'
import reactLogo from './assets/react.svg'

function App() {

  return (
    <div>
      <h1><img src={reactLogo} alt=""/>react-easy-grid</h1>
      <GridContainer style={{
        height: '300px'
      }}>
        <GridItem start="r1c1">
          <div style={{background: 'red', height: '100%'}}>1</div>
        </GridItem>
        <GridItem start="r1c2" end="r4c3">
          <div style={{background: 'blue', height: '100%'}}>2</div>
        </GridItem>
        <GridItem start="r3c3" end="r7c7">
          <div style={{background: 'green', height: '100%'}}>3</div>
        </GridItem>
        <GridItem start="r8c8" end="r10c10">
          <div style={{background: 'linen', height: '100%'}}>3</div>
        </GridItem>
      </GridContainer>
    </div>
  )
}

export default App
