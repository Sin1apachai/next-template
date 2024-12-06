import React from "react";

export default function TableData({
    headers,
    data = [],
    isLoading = false,
}) {
    return (
        <div className="p-6">
            {isLoading ? (
                <div className="text-center py-4">
                    <div className="loader"></div>
                    Loading...
                </div>
            ) : data.length > 0 ? (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="border border-gray-300 px-4 py-2"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        {row[header.toLowerCase()] || "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-4">
                    No Data Available
                </div>
            )}
        </div>
    );
}