import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
          <div className="flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/test">Testing</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group relative px-4 py-2 text-sm font-medium text-gray-300 transition-colors
        hover:text-white"
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-gradient-to-r from-blue-400
          via-purple-400 to-pink-400 transition-transform duration-200
          group-hover:scale-x-100"
      />
    </Link>
  )
}
export default Header
