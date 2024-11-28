type attrProps = {
    message: string;
};

export default function ErrorMessage({ message }: attrProps) {
    return <p className="text-red-500 mb-4">{message}</p>;
}