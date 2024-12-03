import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import InputField from '@/app/components/InputField';
import ErrorMessage from '@/app/components/ErrorMessage';
import SubmitButton from '@/app/components/SubmitButton';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                setError('Invalid credentials');
            } else {
                router.push('/');
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
