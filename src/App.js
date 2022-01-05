import React from 'react'

// Custom components
import LoginPage from './Pages/LoginPage/LoginPage'
import * as AppConstants from './Constants/AppContants'

// Styles
import './Styles/main.scss'

function App() {

  React.useEffect(() => {
    document.title = AppConstants.APP_NAME
  }, [])

  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default App
