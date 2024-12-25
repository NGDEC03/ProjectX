'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
    const WithAuthRedirect = (props: React.ComponentProps<typeof WrappedComponent>) => {
        const { user,updateUser } = useUser();
        const router = useRouter();

        useEffect(() => {
            updateUser();
            if (user) {
                router.push('/');
            }
        }, [user, router, updateUser]);

        return <WrappedComponent {...props} />;
    };

    WithAuthRedirect.displayName = `WithAuthRedirect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuthRedirect;
};

export default withAuthRedirect;