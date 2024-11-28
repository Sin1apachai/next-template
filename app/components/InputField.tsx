type attrProps = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
    id,
    label,
    type,
    value,
    onChange,
}: attrProps) {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                required
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
        </div>
    );
}
