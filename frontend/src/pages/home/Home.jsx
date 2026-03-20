import React from 'react'
import './home.css'
import Header from '../../components/header/Header.jsx'
import Exploremenu from '../../components/exploremenu/Exploremenu.jsx'
import{useState} from 'react'
import Fooddisplay from '../../components/fooddisplay/Fooddisplay.jsx'


const Home = () => {
  const[category,setCategory] = useState('All')
  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory } />
      <Fooddisplay category={category} />

      
    </div>
  )
}

export default Home
