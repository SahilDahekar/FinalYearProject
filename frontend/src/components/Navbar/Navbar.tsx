import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

function Navbar() {

    const list = [
        {
            name: 'About',
            link: '/about',
        },
        {
            name: 'Features',
            link: '/features',
        },
        {
            name: 'Login',
            link: '/auth',
        },
        {
            name: 'Get Started',
            link: '/auth',
        }
    ];
  return (
    <nav className='mx-auto py-4 px-4 flex justify-between max-w-7xl items-center'>
        <div>
            <Link to="/">
                <h3 className='scroll-m-20 text-3xl font-semibold tracking-tight'>StreamSync</h3>
            </Link>
        </div>
        <div className='flex gap-2 items-center'>
            {list.map((item) => {
                if(item.name === 'Login'){
                    return (
                    <Button className='font-bold' variant="secondary" key={item.name} asChild>
                        <Link to={item.link}>{item.name}</Link>
                    </Button>);
                } else if (item.name === 'Get Started') {
                    return (
                    <Button className='font-bold' key={item.name} asChild>
                        <Link to={item.link}>{item.name}</Link>
                    </Button>);
                }
                return (
                    <Button className='font-bold' variant="ghost" key={item.name} asChild>
                        <Link to={item.link}>{item.name}</Link>
                    </Button>
                )
                
                })}
        </div>
    </nav>
  )
}

export default Navbar