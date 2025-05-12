import { FcGoogle } from "react-icons/fc"

export default function SocialLogin() {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {/* Divider with "Or" text */}
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-600">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="flex flex-col space-y-3">
        {/* Google Login */}
        <button className="flex items-center justify-center w-full py-2.5 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors" 
        onClick={() => alert("구글 로그인 구현 준비중!")}>
          <FcGoogle className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium text-gray-700">Google 로그인</span>
        </button>

        {/* Kakao Login */}
        <button className="flex items-center justify-center w-full py-2.5 px-4 bg-[#FEE500] rounded-full hover:bg-[#FDD835] transition-colors"
          onClick={() => alert("카카오 로그인 구현 준비중!")}>
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.5C6.47761 2.5 2 6.08248 2 10.5C2 13.2398 3.67593 15.6341 6.16651 17.0073L5.26511 20.5761C5.1743 20.8519 5.45107 21.0875 5.70196 20.9297L9.99998 18.2616C10.6496 18.3489 11.3185 18.3947 12 18.3947C17.5224 18.3947 22 14.8122 22 10.3947C22 5.97722 17.5224 2.5 12 2.5Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-medium text-gray-800">카카오 로그인</span>
        </button>

        {/* Naver Login */}
        <button className="flex items-center justify-center w-full py-2.5 px-4 bg-[#03C75A] rounded-full hover:bg-[#02B350] transition-colors"
          onClick={() => alert("네이버 로그인 구현 준비중!")}>
          <div className="w-5 h-5 mr-3 flex items-center justify-center bg-white rounded-full">
            <svg className="w-4 h-4" viewBox="2 1 19 19" fill="none">
              <path d="M13.5 5H16.5V15H13.5L10 10V15H7V5H10L13.5 10V5Z" fill="#03C75A" />
            </svg>
          </div>
          <span className="text-sm font-medium text-white">네이버 로그인</span>
        </button>
      </div>
    </div>
  )
}
