import React, {useState, useEffect} from 'react';
import Header from '../components/paginas/header';
import Footer from '../components/common/footer';

interface Props{
  children: React.ReactNode
  
}

const LayoutPages : React.FC<Props> = ({  children }) => {
  
  const [componentLoaded, setComponentLoaded] = useState<boolean>(false);

  useEffect(() => {
    setComponentLoaded(true);
  }, []);

  return (
    <div className='container-fluid'>
        <Header/>
          {
            (componentLoaded === true) ? children : <></>
          }

        <Footer />
    </div>   
  );
};

export default LayoutPages;