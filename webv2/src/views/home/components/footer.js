import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { name: 'Contact' },
  { name: 'About Us' },
  { name: "FAQ's" },
  { name: 'Support' },
];

export function Footer() {
  return (
    <footer className="bg-primary-400 text-sm leading-5 tracking-normal text-white lg:bg-transparent lg:text-gray-400">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex flex-wrap py-10 lg:justify-between">
          <ul className="mb-6 inline-flex w-full flex-none justify-center lg:order-1 lg:mb-0 lg:flex lg:w-1/2 lg:justify-end">
              {NAV_LINKS.map((link) => (
                <li key={link.name} className="ml-4">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? 'border-b text-white' : 'text-white hover:border-b'
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
          </ul>
          <div className="mb-6 inline-flex w-full flex-none justify-center lg:w-1/2 lg:justify-start">
            &copy; yGoenka
          </div>
        </div>
      </div>
    </footer>
  )
}
