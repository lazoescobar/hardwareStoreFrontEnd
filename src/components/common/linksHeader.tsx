import Link from 'next/link';

import styles from './header.module.css'

interface Link {
    nombre: string;
    ruta: string;
}

interface Links {
    listadoLinks : Array<Array<Link>>;
}

const LinksHeader: React.FC<Links> = ({ listadoLinks }) => {

  return (
    <div className='container-fluid'>
        {
            listadoLinks.map((row, index) => (
                <div key={'fat'+'row'+index} className={styles.contenedorLinks}>
                    <div key={'row'+index} className='row'>
                    {
                        row.map((col, indexCol) => (
                            <div key={'col'+index+indexCol} className="col-lg-4">
                                <Link className={styles.links} href={col.ruta}>{col.nombre}</Link>
                            <hr/>
                            </div>
                        ))
                    }
                    </div>


                </div>
                
                
            ))
        }
    </div>

  );
};

export default LinksHeader;