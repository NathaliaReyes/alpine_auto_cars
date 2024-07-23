import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminMenu } from '@/components/main/AdminMenu';
// import logo from '@/assets/logo/new.png';
// import Image from '@/assets/images/cover.png';
// import '../styles/Navbar.css';

function NavTabs() {
  const currentPage = useLocation().pathname;
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let pageTitle = '';
    switch (currentPage) {
      case '/':
        pageTitle = 'Home';
        break;
      case '/About':
        pageTitle = 'About';
        break;
      case '/Inventory':
        pageTitle = 'Inventory';
        break;
      case '/Contact':
        pageTitle = 'Contact';
        break;
      default:
        pageTitle = "Alpine Auto Sales"
        break;
    }
    document.title = `${pageTitle} | Alpine Auto Sales`
  }, [currentPage]);

  const navbarImageClass = () => {
    if (isActive) {
      return 'navbar-background-image';
    }
    return currentPage === '/' ? 'navbar-background-image-large' : 'navbar-background-image';
  };

  const navbarClass = () => {
    if (isActive) {
      return "p-3 flex items-center justify-between flex-wrap navbar-transparent shadow-md";
    } else {
      return "p-3 flex items-center justify-between flex-wrap bg-white  shadow-md";
    }
  };

  const getLinkClass = (path) => {
    return currentPage === path ? 'block mt-4 md:inline-block md:mt-0 text-blue-800 hover:text-sky-300 mr-4 font-bold' : 'font-semibold block mt-4 md:inline-block md:mt-0 text-black hover:text-blue-400 mr-4';
  };

  return (
    <div className='navbar-image-container'>
      <nav className={navbarClass()}>
        <div className="flex items-center flex-shrink-0 text-black">
          {/* <img src={logo} alt="logo" className='h-16 w-16'></img> */}
          <span className='font-bold lg:text-3xl md:text-xl text-xl tracking-tight' id="nav-name" style={{ textShadow: '2px 2px rgba(0, 0, 0, 0.1)' }}>Alpine Auto Sales, LLC.</span>
        </div>
        <div className="block md:hidden mr-2">
          <button onClick={toggleMenu} className="flex flex-col justify-around items-center w-10 h-10 rounded mt-2 mb-2 bg-customWhite hover:bg-customGray p-2">
            <div className="w-3 h-0.5 bg-stone"></div>
            <div className="w-6 h-0.5 bg-stone"></div>
            <div className="w-3 h-0.5 bg-stone"></div>
          </button>
        </div>
        <div className={`w-full ${isActive ? 'block' : 'hidden'} md:flex md:items-center md:w-auto`} id="navMenu">
          <div className="lg:text-lg md:text-base sm:text-sm md:flex-grow ml-1 ">
            <Link to="/" onClick={toggleMenu} className={getLinkClass('/')}>Home</Link>
            <Link to="/Inventory" onClick={toggleMenu} className={getLinkClass('/Inventory')}>Inventory</Link>
            <Link to="/Contact" onClick={toggleMenu} className={getLinkClass('/Contact')}>Contact Us</Link>
            <AdminMenu className={getLinkClass} onClick={toggleMenu}/>
          </div>
        </div>
      </nav>
      {/* <img src={Image} alt="banner-plane" className={`${navbarImageClass()} hidden-on-mobile`} /> */}
    </div>
  );
}

export default NavTabs;
