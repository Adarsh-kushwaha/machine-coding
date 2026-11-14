import React, { useEffect, useState } from 'react'
import Parent from '../components/theme/parent'
import "../components/theme/theme.css"
import { ThemeContextProvider } from '../components/theme/themeProvider'



const ThemeSwitch = () => {



  return (
    <ThemeContextProvider>
      <div style={{ height: "100vh" }}>
        <Parent/>
      </div>
    </ThemeContextProvider>
  )
}

export default ThemeSwitch