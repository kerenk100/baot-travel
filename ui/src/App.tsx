import './App.css'
import { Header } from './components/Header/Header'
import { Content } from './components/Content/Content'

export const App = () => {

  return (
    <>
    <Header height={64}/>
    <Content style={{position:'absolute',top:'64px', width:'100%', height:'calc(100% - 64px)'}}>
      <h1>
          Baot travel
      </h1>
      </Content>
    </>
  )
}
