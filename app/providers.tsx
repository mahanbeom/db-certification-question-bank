'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() =>
        new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 1000 * 60,     // 데이터를 “신선(fresh)”하다고 간주하는 시간. 1분
                    gcTime: 1000 * 60 * 5,    // 캐시 유지 시간
                    retry: 1, // 실패 시 재시도 횟수
                    refetchOnWindowFocus: false, // 탭 다시 들어올 때 refetch 여부
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}