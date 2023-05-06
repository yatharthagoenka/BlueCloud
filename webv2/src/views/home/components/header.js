import { Link } from 'react-router-dom'
import cloud from 'src/assets/images/logos/cloud-logo.svg';
import { Button } from '@mui/material';

const NAV_LINKS = [
  { name: 'Login' },
  { name: 'Sign Up' }
];

export function Header({ title }) {
  return (
    <header className="relative py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <h1 className="m-0 text-xl font-bold uppercase leading-none">
            <Link to="/" className="flex items-center no-underline">
              <img src={cloud} style={{width: 40}} />
            </Link>
          </h1>
          <div style={{zIndex: 1}}>
            <Link to="/auth/login">
              <Button variant="contained" color="error" style={{marginRight: 20}}>Login</Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="contained" color="success">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
