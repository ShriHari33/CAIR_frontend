import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function withAuth(ComponentToProtect)
{
    return function ProtectedRoute(props) {
        const [isLoading, setIsLoading] = useState(true);
        const [shouldRedirect, setShouldRedirect] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            fetch('/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        setIsLoading(false);
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                    setShouldRedirect(true);
                });
        }, []);

        if (isLoading) {
            return null;
        }

        if (shouldRedirect) {
            navigate('/Login');
            return null;
        }

        return <ComponentToProtect {...props} />;
    }
}