'use client';

import MenuItems from '@/app/components/menubar/MenuItems';
import LogoMenu from '@/app/components/menubar/logo/Logo';
import SignOut from '@/app/components/menubar/signout/SignOut';

import {
    faHome,
    faUser,
    faCog,
    faChartBar,
    faTable,
    faEdit,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const menuItems = [
    {
        label: 'Dashboard',
        link: '/dashboard',
        icon: faHome,
        submenu: [
            {
                label: 'Overview',
                link: '/dashboard/overview',
                icon: faChartBar,
            },
            { label: 'Stats', link: '/dashboard/stats', icon: faTable },
        ],
    },
    {
        label: 'Profile',
        link: '/profile',
        icon: faUser,
        submenu: [
            { label: 'Edit Profile', link: '/profile/edit', icon: faEdit },
            { label: 'Settings', link: '/profile/settings', icon: faCog },
        ],
    },
];
const settingsMenu = [
    {
        label: 'Settings',
        link: '/web/settings',
        icon: faCog,
        submenu: [
            {
                label: 'User Management',
                link: '/web/users',
                icon: faUsers,
            },
            {
                label: 'Profile',
                link: '/web/profile',
                icon: faUser,
            },
        ],
    },
];
const company = 'My Company';

export default function SideNavbar() {
    const { data: session, status } = useSession();
    // const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/');
        }
    }, [status, router]);
    // phone:bg-green-500 ipad:bg-blue-500 pc:bg-yellow-500
    return (
        <div className="flex min-h-screen bg-white-500">
            <aside className="w-64 bg-white text-black shadow-lg shadow-gray-500/50 flex flex-col">
                {/* Menu */}
                <LogoMenu company={company} />
                {/* Menu Dynamic */}
                <MenuItems menuItems={menuItems} />

                {/* Settings */}
                <div className="mt-auto border-t border-gray-300">
                    <MenuItems menuItems={settingsMenu} />
                </div>
                {/* SignOut */}
                <SignOut sessions={session} />
            </aside>
        </div>
    );
}
