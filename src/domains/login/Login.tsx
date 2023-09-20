import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Toast from "../../components/toast/Toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        navigate("/");
      }
    } catch (error: unknown) {
      const newError = error as Error;
      setError(newError.message as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CCC8AA] to-[#F1EFEF]">
      {error && <Toast onClose={() => setError("")} />}
      <div className="bg-white p-10 rounded-lg shadow-md backdrop-blur-md backdrop-opacity-30">
        <h2 className="text-2xl font-semibold mb-4 text-[#191717]">Login</h2>
        <form onSubmit={signIn}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-[#191717]">
              Username
            </label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="username"
              className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#191717]">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
