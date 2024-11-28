const fetcherJson = async (
    url: string,
    method: string,
    body?: any,
    headers: Record<string, string> = { 'Content-Type': 'application/json' }
): Promise<any> => {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        return await response.json();
    } catch (error) {
        console.error(`Error with ${method} ${url}:`, error);
        throw error;
    }
};

export const postJson = async (url: string, body: any): Promise<any> => {
    return fetcherJson(url, 'POST', body);
};

export const getJson = async (url: string): Promise<any> => {
    return fetcherJson(url, 'GET');
};

export const putJson = async (url: string, body: any): Promise<any> => {
    return fetcherJson(url, 'PUT', body);
};

export const deleteJson = async (url: string): Promise<any> => {
    return fetcherJson(url, 'DELETE');
};
