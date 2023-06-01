import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import App from './App'
import './EnterVM.css'


const EnterVM = () => {
  return (
    <div className="EnterVM">
        <Routes>
          <Route exact path="/" Component={SignUp} />
          <Route exact path="/SignIn" Component={SignIn} />
          <Route exact path="/App" Component={App} />
        </Routes>
    </div>
  )
}

export default EnterVM