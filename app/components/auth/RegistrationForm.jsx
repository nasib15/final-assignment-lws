const RegistrationForm = () => {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="User Name"
        name="username"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="cpassword"
        className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        className="w-full bg-primary text-white rounded-full py-3 hover:bg-primary transition"
      >
        Continue
      </button>
    </form>
  );
};
export default RegistrationForm;
