import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function Layout() {
  return (
    <>
      <Header />
      <main className="flex min-h-[80vh] w-screen items-center justify-center">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
