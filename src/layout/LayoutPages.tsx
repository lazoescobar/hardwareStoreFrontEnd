import React from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

interface Link {
  nombre: string;
  ruta: string;
}
interface Props{
  nombreUsuario: string;
  listadoLinks : Array<Array<Link>>;
  children: React.ReactNode
  
}

const LayoutPages : React.FC<Props> = ({ nombreUsuario, listadoLinks, children }) => {
  return (
    <div className='container-fluid'>
        <Header nombreUsuario={nombreUsuario} listadoLinks={listadoLinks}/>
        {children}
        <Footer />
    </div>   
  );
};

export default LayoutPages;