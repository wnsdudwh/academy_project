"use client";

import { useState } from "react";
import "../../static/css/Footer.css";

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const copyEmail = () => {
    navigator.clipboard.writeText("dhdhwnsdud1@naver.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer className="w-full bg-zinc-900 text-gray-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-800">
          {/* 왼쪽 컬럼 */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-white">JJY</div>
              <span className="ml-3 text-sm bg-indigo-600 text-white px-2 py-0.5 rounded">Portfolio</span>
            </div>
            <p className="text-gray-400 mb-4">
              안녕하세요, 프론트엔드 개발자 조준영입니다. 사용자 경험을 중요시하며 깔끔하고 효율적인 코드를 작성하기 위해 노력합니다.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/wnsdudwh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                    0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                    -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                    .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951
                    0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65
                    0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337
                    1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
                    .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943
                    .359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747
                    0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <button
                onClick={copyEmail}
                className="text-gray-400 hover:text-white transition-colors relative"
                aria-label="Copy email address"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {emailCopied && (
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    복사됨!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 가운데 컬럼 */}
          <div className="col-span-1 px-20">
            <h3 className="text-lg font-semibold text-white mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13
                    a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498
                    a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>010-0000-0000</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span>github.com/wnsdudwh</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>dhdhwnsdud1@naver.com</span>
              </li>
            </ul>
          </div>

        {/* 오른쪽 컬럼 - 기술 스택 */}
        <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">기술 스택</h3>
            <div className="flex flex-wrap gap-2">
                {[
                "React",
                "JavaScript",
                "Node.js",
                "Spring Boot",
                "React Router",
                "Axios",
                "Tailwind CSS",
                "Git",
                "Responsive Design",
                "Postman"
                ].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-gray-800 rounded text-xs">
                    {tech}
                </span>
                ))}
            </div>
        </div>


        </div>

        {/* 하단 */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">홈</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">프로젝트</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">연락처</a>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Jo Jun Yeong. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;