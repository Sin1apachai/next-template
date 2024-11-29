'use client';

import MenuItems from '@/app/components/menubar/MenuItems';
import SettingsMenu from '@/app/components/menubar/settings/SettingsMenu';
import LogoMenu from '@/app/components/menubar/logo/LogoMenu';

import {
    faHome,
    faUser,
    faCog,
    faChartBar,
    faTable,
    faEdit,
} from '@fortawesome/free-solid-svg-icons';

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
const company = 'My Company';

export default function SideNavbar() {
    // phone:bg-green-500 ipad:bg-blue-500 pc:bg-yellow-500
    return (
        <div className="flex min-h-screen bg-white-500">
            <aside className="w-64 bg-white text-black shadow-lg shadow-gray-500/50 flex flex-col">
                {/* Menu */}
                <LogoMenu company={company} />
                {/* Menu Dynamic */}
                <MenuItems menuItems={menuItems} />

                {/* Settings Menu */}
                <div className="mt-auto border-t border-gray-300">
                    <SettingsMenu />
                </div>
            </aside>
            <h1>Hello from the Web Page in App Directory!</h1>
        </div>
    );
}
