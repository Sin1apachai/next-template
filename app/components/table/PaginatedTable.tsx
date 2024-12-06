import React, { useState, useEffect, useCallback } from 'react';
import DynamicTable from './TableData';

export default function PaginatedTable({
  apiEndpoint,
  headers,
}: {
  apiEndpoint: string;
  headers: string[];
}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  const fetchData = useCallback(
    async (page: number) => {
      try {
        const res = await fetch(
          `${apiEndpoint}?page=${page}&limit=${itemsPerPage}`
        );
        const result = await res.json();
        setData(result.users || []);
        setTotalPages(result.totalPages || 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [apiEndpoint, itemsPerPage]
  );

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="loader"></div> 
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <DynamicTable headers={headers} data={data} isLoading={isLoading} />
      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 rounded ${page === index + 1
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
              }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}