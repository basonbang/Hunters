import { Outlet, Link } from 'react-router-dom'

const Header = () => {
  return ( 
    <>
      <div className="flex justify-between items-center p-4  text-white w-full fixed top-0 left-0 z-10 bg-[#1a1a1a] border-b border-gray-600">
        <Link to='/'>
          <h2 className="text-xl font-bold pl-4"> Hunters </h2>
        </Link>
        <nav className="flex">
          <Link to='/' className="px-4 py-2 hover:bg-gray-700 rounded"> Home </Link>
          <Link to='/create' className="px-4 py-2 hover:bg-gray-700 rounded"> Create </Link>
          <Link to='/gallery' className="px-4 py-2 hover:bg-gray-700 rounded"> Gallery</Link>
        </nav>
      </div>
      <div className='m-12'>
        <Outlet />
      </div>
    </>
   );
}
 
export default Header;