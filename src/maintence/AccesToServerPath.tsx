export const AccesToServerPath = () => {
    const localServerpath = true;
    return localServerpath ? 'http://localhost:8000/' : '/';
}

