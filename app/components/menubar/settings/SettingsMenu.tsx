import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default function SubMenu() {
    return (
        <nav className="bg-white-800 text-black w-64">
            <ul>
                <li key={'settings'} className="border-b border-black-800">
                    <div className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center space-x-10">
                            <FontAwesomeIcon
                                icon={faCog}
                                className="text-pink-300 w-6 h-6"
                            />
                            <Link
                                href={'/settings'}
                                className="text-black font-medium"
                            >
                                {'Settings'}
                            </Link>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
