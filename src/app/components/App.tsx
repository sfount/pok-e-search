import * as React from 'react'

import SessionRightPanel from '../containers/SessionRightPanel'
import SessionFavourites from '../containers/SessionFavourites'

const App = () => {
  return (
    <div className="container">
      <div className="left">
        <SessionFavourites />
      </div>
      <div className="right">
        <SessionRightPanel />
      </div>
    </div>
  )
}

export default App