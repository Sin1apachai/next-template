'use client';

import PaginatedTable from '@/app/components/table/PaginatedTable';

export default function UserManagement() {
    const headers = ['Name', 'Email', 'Role'];
    const apiEndpoint = '/api/users';

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <PaginatedTable apiEndpoint={apiEndpoint} headers={headers} />
        </div>
    );
}
