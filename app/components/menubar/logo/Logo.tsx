import Image from 'next/image';

export default function Logo({ company }) {
    return (
        <div className="p-4 flex items-center justify-start border-b border-gray-200">
            <Image
                src="/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full"
            />
            <span className="text-x font-bold ml-2">
                {company || 'My Company'}
            </span>
        </div>
    );
}
