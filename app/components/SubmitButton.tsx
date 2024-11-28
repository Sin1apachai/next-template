type attrProps = {
    text: string;
};

export default function SubmitButton({ text }: attrProps) {
    return (
        <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
            {text}
        </button>
    );
}
