import Link from 'next/link';

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
                <div key={'row'+index} className='row'>
                    {
                        row.map((col, indexCol) => (
                            <div key={'col'+index+indexCol} className="col-lg-4">
                                <Link href={col.ruta}>{col.nombre}</Link>
                            </div>
                        ))
                    }
                </div>
            ))
        }
    </div>

  );
};

export default LinksHeader;