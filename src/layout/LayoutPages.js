import Header from '../components/common/header';

const LayoutPages = ({ children }) => {
  return (
    <div className='container-fluid'>
      <Header />
      <main>{children}</main>
      <footer>
        {/* Aquí puedes colocar tu pie de página común */}
        Pie de página común
      </footer>
    </div>
  );
};

export default LayoutPages;