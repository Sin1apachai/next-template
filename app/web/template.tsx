'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SideNavbar from '@/app/components/menubar/SideNavbar';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    if (!session) {
        const pathname = '/web/login';
        if (pathname !== '/web/login') {
            redirect('/web/login');
        }
    }

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            {session && (
                <div className="w-full flex-none md:w-64">
                    <SideNavbar />
                </div>
            )}
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}
