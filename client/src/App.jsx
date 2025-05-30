// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CrearSolicitud from './pages/CrearSolicitud';
import DetalleSolicitud from './pages/DetalleSolicitud';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CrearSolicitud />} />
        <Route path="/solicitud/:id" element={<DetalleSolicitud />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-100">
//       <h1 className="text-4xl font-bold text-blue-800">
//         ¡Tailwind está funcionando!
//       </h1>
//     </div>
//   );
// }

// export default App;


// export default App
