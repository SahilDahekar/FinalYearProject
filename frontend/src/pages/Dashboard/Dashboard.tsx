import { Link, NavLink, Outlet } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { IoVideocam ,IoKey } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useToast } from '@/components/ui/use-toast';

function Dashboard() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    function handleLogout(){
        auth?.logout();
        navigate('/');
        toast({
            title : `Logged out ${auth?.user?.name}`
        })
    }

    return (
        <div className='h-screen'>
            <div className='flex justify-between py-4 px-3 border-b'>
                <h1 className='text-3xl font-semibold tracking-tight'>Dashboard</h1>
                <div>
                    <Avatar className='cursor-pointer'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className='flex h-[90%]'>
                <div className='w-1/6 gap-2 flex flex-col p-2'>
                    <NavLink className={(props) => (props.isActive ? 'bg-secondary rounded-md' : '')} to="/broadcast">
                        <Button className='text-base w-full' variant="ghost" size='lg'>
                            <IoVideocam className='mr-2'/> Broadcast
                        </Button>
                    </NavLink>
                    <NavLink className={(props) => (props.isActive ? 'bg-secondary rounded-md' : '')} to="/destination">
                        <Button className='text-base w-full' variant="ghost" size='lg'>
                            <IoKey className='mr-2'/> Destination
                        </Button>
                    </NavLink>
                    <Button onClick={handleLogout} className='text-base mt-auto' variant="default" size='lg'>
                        <TbLogout2 className='mr-2'/> Sign Out
                    </Button>
                </div>
                <div className='w-5/6 border'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
