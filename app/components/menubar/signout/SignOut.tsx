import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'next-auth/react';

export default function SignOut({ sessions }) {
    return (
        <nav className="bg-white-800 text-black w-64">
            <ul>
                <li key={'settings'} className="border-b border-black-800">
                    <div className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center space-x-10">
                            <FontAwesomeIcon
                                icon={faPowerOff}
                                className="text-pink-300 w-6 h-6"
                            />
                            <Link
                                href="#"
                                onClick={() =>
                                    signOut({ callbackUrl: '/web/login' })
                                }
                                className="text-black font-medium"
                            >
                                {'SignOut'}
                            </Link>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
