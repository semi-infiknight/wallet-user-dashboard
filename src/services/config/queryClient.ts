import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10,
            retry: 0,
            refetchOnWindowFocus: false,
        },
    },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invalidateQuery = (queryKey: any) => queryClient.invalidateQueries({ queryKey });

export default queryClient;