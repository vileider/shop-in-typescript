


export const CustomFetch = async (endpoint: string,
    method: string,
    dataToTransfer?: [] | object,
) => {
    const fetchTask = new Request(endpoint,
        {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToTransfer)
        });
    return await fetch(fetchTask)
        .then(response => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}