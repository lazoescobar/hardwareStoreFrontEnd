import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './links.module.css';

interface Link {
    nombre: string;
    ruta: string;
}

interface Links {
    listadoLinks : Array<Array<Link>>;
}

const LinksHeader: React.FC<Links> = ({ listadoLinks }) => {

    if(!listadoLinks){
        return;
    }

    const cantidadAccesos = listadoLinks.length;
    const pathname = usePathname();

    return (
        <div className='container-fluid'>
            {
                listadoLinks.map((row, index) => (
                    <div key={'fat'+'row'+index} className={(cantidadAccesos > 1) ? styles.contenedorLinks : styles.contenedorLinksWithOne }>
                        <div key={'row'+index} className='row'>
                        {
                            row.map((col, indexCol) => (
                                <div key={'col'+index+indexCol} className="col-lg-4">
                                    <div className={styles.links}>
                                        <Link legacyBehavior href={col.ruta} prefetch={false} replace passHref>
                                            <a href={col.ruta} className={(pathname === col.ruta) ? styles.activelink : styles.inactivelink}><strong>{col.nombre}</strong></a>
                                        </Link>
                                    </div>
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