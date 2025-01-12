import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router';
import { RxCross2 } from "react-icons/rx";
import { FeatureSoonContext } from '../contexts/featureSoonContext/UseFeatureSoon';

function LoginErrorWarn() {
    const { isLoginUser, setIsLoginUser } = useContext(FeatureSoonContext);

    const handleClickOutsideLoginWarn = (event) => {
        if (!event.target.closest(".warningPopup")) {
          setIsLoginUser(true);
        }
      };
      useEffect(() => {
        document.addEventListener("click", handleClickOutsideLoginWarn);
    
        return () => {
          document.removeEventListener("click", handleClickOutsideLoginWarn);
        };
      }, []);

  return (
    <section
          className={`${
            isLoginUser
              ? "invisible opacity-0 translate-y-[20px]"
              : "visible opacity-100 translate-y-0"
          } transition-all duration-300 ease-in-out fixed w-[100vw] h-[100vh] bg-[#0000007e] rounded-xl top-0 left-0 z-[99]`}
        >
          <div className="warningPopup absolute bg-[#ffae0050] border flex items-center gap-16 border-orange-300 rounded-xl p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl text-white font-bold">
              <Link
                to={"/login"}
                className="text-blue-300 cursor-pointer underline-offset-1 underline"
              >
                Login
              </Link>{" "}
              to active all features...
            </h1>
            <RxCross2
              onClick={() => setIsLoginUser(true)}
              className="crossBtn text-xl text-orange-300 cursor-pointer hover:scale-110"
            />
          </div>
        </section>
  )
}

export default LoginErrorWarn
