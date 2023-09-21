import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Toast from "../../components/toast/Toast";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorPassword, setShowErrorPaswword] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user) {
        setIsLoading(false);
        navigate("/");
      }
    } catch (error: unknown) {
      setIsLoading(false);
      const newError = error as Error;
      setError(newError.message as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#CCC8AA] to-[#F1EFEF]">
      {error && <Toast message={error} onClose={() => setError("")} />}
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="username"
              onFocus={() => {
                setTouchedName(true);
                if (touchedPassword) {
                  setShowErrorPaswword(true);
                }
              }}
              className={`w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                touchedName && showErrorName && !email && "border-red-500"
              }`}
            />
            {touchedName && showErrorName && !email && (
              <span className="text-red-500 mt-2">Required</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#191717]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => {
                  setTouchedPassword(true);
                  if (touchedName) {
                    setShowErrorName(true);
                  }
                }}
                name="password"
                className={`w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                  touchedPassword &&
                  showErrorPassword &&
                  !password &&
                  "border-red-500"
                }`}
              />
              <div className="absolute top-4 right-4 cursor-pointer">
                {!showPassword ? (
                  <AiFillEye onClick={() => setShowPassword(true)} />
                ) : (
                  <AiFillEyeInvisible onClick={() => setShowPassword(false)} />
                )}
              </div>
            </div>

            {touchedPassword && showErrorPassword && !password && (
              <span className="text-red-500 mt-2">Required</span>
            )}
          </div>
          <div className="text-center flex justify-center">
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className={`bg-blue-500 text-white py-2 w-20 flex justify-center rounded-md hover:bg-blue-600 transition duration-300 ${
                (isLoading || !email || !password) && "opacity-50"
              }`}
            >
              {!isLoading ? (
                "Login"
              ) : (
                <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-b-4 border-white"></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
