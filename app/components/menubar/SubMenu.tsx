import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SubMenu({ submenu }) {
    return (
        <ul className="ml-4 bg-white-800 border-l border-black-300">
            {submenu.map((item, index) => (
                <li
                    key={index}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-pink-200"
                >
                    <FontAwesomeIcon
                        icon={item.icon}
                        className="w-4 h-4 text-pink-400"
                    />
                    <Link href={item.link} className="text-sm text-black-700">
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
