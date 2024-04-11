import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Gallery from './components/Gallery'
import CreateHunter from './components/CreateHunter'
import HunterDetails from './components/HunterDetails'
import EditHunter from './components/EditHunter'
import NoMatch from './components/NoMatch'

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<Home />}/>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/create" element={<CreateHunter />}/>
          <Route path="/:hunterId" element={<HunterDetails />}> 
            <Route path="/:hunterId/edit" element={<EditHunter />} />
          </Route>
          <Route path="*" element={<NoMatch/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
