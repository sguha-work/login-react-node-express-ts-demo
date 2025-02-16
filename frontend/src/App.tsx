import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index.page.component';
import HomePage from './pages/Home.page.component';
import LoginPage from './pages/Login.page.component';
import SignupPage from './pages/Signup.page.component';
import { useCallback, useEffect } from 'react';
function App() {
  const runJS = useCallback(() => {
    const darkModeToggle = document.getElementById('darkModeToggle');console.log(darkModeToggle);
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
      darkModeToggle?.setAttribute('checked', 'true');
    }
    darkModeToggle?.addEventListener('change', () => {
      if (document.body.classList.contains('dark-theme')) {console.log(1)
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      } else {console.log(2)
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  },[]);
  useEffect(() => {
    runJS();
  }, []);
  return (
    <>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" id="darkModeToggle" />
          <span className="slider"></span>
        </label>
        <span className="toggle-text">Light Mode</span>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="" index element={<IndexPage></IndexPage>}></Route>
          <Route path="/login" index element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" index element={<SignupPage></SignupPage>}></Route>
          <Route path="/signup" index element={<HomePage></HomePage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
