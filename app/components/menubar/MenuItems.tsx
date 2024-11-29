import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LazySubmenu = React.lazy(() => import('./SubMenu'));

export default function MenuItems({ menuItems }) {
    const [openMenu, setOpenMenu] = React.useState(null);

    const toggleMenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    return (
        <nav className="bg-white-800 text-black w-64">
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} className="border-b border-black-800">
                        <div
                            className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleMenu(index)}
                        >
                            <div className="flex items-center space-x-10">
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="text-pink-300 w-6 h-6"
                                />
                                <Link
                                    href={item.link}
                                    className="text-black font-medium"
                                >
                                    {item.label}
                                </Link>
                            </div>

                            {item.submenu.length > 0 && (
                                <span className="text-pink-300">
                                    {openMenu === index ? '▲' : '▼'}
                                </span>
                            )}
                        </div>

                        {openMenu === index && item.submenu.length > 0 && (
                            <React.Suspense
                                fallback={
                                    <div className="flex justify-center items-center p-4">
                                        <Image
                                            src="/spin.svg"
                                            alt="Loading..."
                                            width={8}
                                            height={8}
                                            className="w-8 h-8 animate-spin"
                                        />
                                    </div>
                                }
                            >
                                <LazySubmenu submenu={item.submenu} />
                            </React.Suspense>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
