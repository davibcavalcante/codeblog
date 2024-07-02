import './styles/index.css';

import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <h1>Testando Reaproveitamento de Componentes com React Router</h1>
      <Outlet />
      <h2>Funcionando!</h2>
    </>
  );
}

export default App;