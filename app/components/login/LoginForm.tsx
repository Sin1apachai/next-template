import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { verifyUserLogin } from '@/app/lib/data';

import InputField from '@/app/components/InputField';
import ErrorMessage from '@/app/components/ErrorMessage';
import SubmitButton from '@/app/components/SubmitButton';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const isAuthenticated = await verifyUserLogin(email, password);
            if (isAuthenticated) {
                router.push('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <ErrorMessage message={error} />}
            <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton text="Login" />
        </form>
    );
}
