"use client"

import { Search, MoreVertical, ArrowUp, ArrowDown } from "lucide-react"

const Sidebar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }

  return (
    <div className="fixed right-4 bottom-20 flex flex-col space-y-2 z-50">
      <button className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors" onClick={scrollToTop}>
        <ArrowUp className="h-5 w-5 text-gray-600" />
      </button>
      <button
        className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors"
        onClick={scrollToBottom}
      >
        <ArrowDown className="h-5 w-5 text-gray-600" />
      </button>
      <button className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors">
        <Search className="h-5 w-5 text-gray-600" />
      </button>
      <button className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors">
        <MoreVertical className="h-5 w-5 text-gray-600" />
      </button>
      <button className="bg-yellow-400 shadow-lg rounded-full p-3 hover:bg-yellow-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
          <path d="M12 3C6.5 3 2 6.58 2 11c0 2.96 1.94 5.54 4.76 7.07l-1.2 4.35c-.11.42.26.8.68.69l4.85-1.5c.31.04.62.06.94.06 5.5 0 10-3.58 10-8s-4.5-8-10-8z" />
        </svg>
      </button>
      <button className="bg-[#03c75a] shadow-lg rounded-full p-3 hover:bg-green-600 transition-colors">
        <div className="w-5 h-5 flex items-center justify-center">
          <span className="text-white font-bold text-xs">N</span>
        </div>
      </button>
    </div>
  )
}

export default Sidebar
