export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
    const apiPath = `${process.env.REACT_APP_SERVER_PATH}${endpoint}`;

    if (method === 'GET') {
        const resp = await fetch(apiPath);
        return await resp.json();
    } else {
        const resp = await fetch(apiPath, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await resp.json();
    }
}

export const fetchWithToken = async (endpoint, data, method = 'GET') => {
    const apiPath = `${process.env.REACT_APP_SERVER_PATH}${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        const resp = await fetch(apiPath, {
            headers: {
                'x-token': token
            }
        });
        return await resp.json();
    } else {
        const resp = await fetch(apiPath, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });

        return await resp.json();
    }
}