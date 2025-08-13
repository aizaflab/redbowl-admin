import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData).unwrap();
      if (res?.data?.token) {
        localStorage.setItem("authToken", res?.data?.token);
        navigate("/");
      } else {
        console.error("Token not found in the response");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  /*  const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await login(formData);
        if (res?.error) {
        }
       
            localDataSetter
        setFormData({
            username: '',
            password: ''
        });
        navigate('/');
    };
 */
  return (
    <div className="h-screen w-full flex items-center justify-center bg-mainBg">
      <div className=" 2xl:w-[28%] xl:w-1/3 lg:w-[45%] sm:w-[55%] w-[94%] bg-primary/20 border border-mainLight/20 rounded px-5 py-8 relative overflow-hidden">
        <h2 className="font-sans font-medium text-2xl text-gray-200  text-center">
          Login
        </h2>
        <div className="h-[1px] w-1/2 bg-mainLight mx-auto mt-2 mb-5"></div>
        <form onSubmit={handleSubmit} className="z-[6] relative">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-200 font-sans mb-2 font-medium text-sm"
            >
              {" "}
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email..."
              className="w-full px-3 py-2.5 border border-mainLight/50 text-gray-0 bg-transparent rounded-md focus:outline-none focus:border-mainLight text-sm font-sans"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-200 font-sans mb-2 font-medium text-sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password..."
              className="w-full px-3 py-2.5 border border-mainLight/50 rounded-md bg-transparent text-gray-0 focus:outline-none focus:border-mainLight text-sm font-sans"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 mx-auto bg-mainLight border border-mainLight text-white py-2 rounded hover:bg-transparent transition duration-300 font-sans font-medium mt-4"
            >
              Login
            </button>
          </div>
        </form>
        <div className="darkMes size-[45rem]  rounded-full absolute bottom-[6rem] -right-96 rotate-45 opacity-30 "></div>
      </div>
    </div>
  );
}
