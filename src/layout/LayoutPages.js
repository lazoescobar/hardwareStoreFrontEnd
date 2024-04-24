import Navbar from '../components/navBar';

const LayoutPages = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <footer>
        {/* Aquí puedes colocar tu pie de página común */}
        Pie de página común
      </footer>
    </div>
  );
};

export default LayoutPages;