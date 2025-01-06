const Input = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  fullWidth = true,
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${fullWidth ? "w-full" : ""} p-3 border rounded-lg ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        min="1"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
