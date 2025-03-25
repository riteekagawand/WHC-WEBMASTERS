import React from "react"
import {
  Github,
  Rocket,
  Code2,
  Palette,
  Terminal,
  Zap,
  Layout,
  Sparkles,
} from "lucide-react"

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="min-h-screen text-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="animate-fade-in">
          <div className="mb-12 text-center">
            <h1
              className="mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text
                text-5xl font-extrabold text-transparent"
            >
              React Template
            </h1>
            <p className="text-lg text-gray-400">
              Built for modern web development
            </p>
          </div>

          <div
            className="mb-12 overflow-hidden rounded-xl bg-gradient-to-r from-gray-800/50
              via-gray-800/50 to-gray-800/50 p-8 shadow-2xl backdrop-blur-lg transition-all
              hover:shadow-purple-500/10"
          >
            <h2 className="mb-6 text-3xl font-bold text-blue-400">
              Welcome to Your React 19 Template
            </h2>
            <p className="mb-6 text-gray-300">
              A modern, performant foundation for your next web application.
              Built with Vite, React 19, and Tailwind CSS, optimized for
              developer experience and production performance.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FeatureCard
                icon={<Terminal className="h-6 w-6 text-emerald-400" />}
                title="Quick Start"
                items={[
                  "Edit src/pages for routing",
                  "Modify src/components for UI",
                  "Style with Tailwind CSS",
                  "npm run dev for development",
                ]}
                gradient="from-emerald-500/10 to-emerald-500/5"
              />

              <FeatureCard
                icon={<Zap className="h-6 w-6 text-yellow-400" />}
                title="Key Features"
                items={[
                  "React 19 with improved rendering",
                  "Lightning-fast HMR with Vite",
                  "Utility-first Tailwind styling",
                  "TypeScript for type safety",
                ]}
                gradient="from-yellow-500/10 to-yellow-500/5"
              />
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <ToolCard
              icon={<Code2 className="h-6 w-6 text-blue-400" />}
              title="React Router Integration"
              description="Built-in routing solution for seamless navigation"
              link="https://reactrouter.com"
              linkText="Router Docs"
              gradient="from-blue-500/10 via-blue-500/5 to-transparent"
            />

            <ToolCard
              icon={<Palette className="h-6 w-6 text-purple-400" />}
              title="Modern Styling"
              description="Tailwind CSS for rapid UI development"
              link="https://tailwindcss.com"
              linkText="Tailwind Docs"
              gradient="from-purple-500/10 via-purple-500/5 to-transparent"
            />
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <ToolCard
              icon={<Layout className="h-6 w-6 text-pink-400" />}
              title="HeroUI Components"
              description="Beautiful, accessible UI components ready to use"
              link="https://heroui.com/"
              linkText="HeroUI Docs"
              gradient="from-pink-500/10 via-pink-500/5 to-transparent"
            />

            <ToolCard
              icon={<Sparkles className="h-6 w-6 text-amber-400" />}
              title="Framer Motion"
              description="Production-ready animations for your React applications"
              link="https://www.framer.com/motion/"
              linkText="Motion Docs"
              gradient="from-amber-500/10 via-amber-500/5 to-transparent"
            />
          </div>

          <div
            className="rounded-xl bg-gradient-to-r from-gray-800/50 via-gray-800/50 to-gray-800/50 p-8
              shadow-lg backdrop-blur-lg"
          >
            <h3 className="mb-6 text-2xl font-bold text-gray-100">
              Ready to Build?
            </h3>
            <div className="flex flex-wrap gap-4">
              <ActionButton
                icon={<Github className="h-5 w-5" />}
                text="View Source"
                link="https://github.com"
              />
              <ActionButton
                icon={<Rocket className="h-5 w-5" />}
                text="Documentation"
                link="https://react.dev"
              />
            </div>
          </div>

          <footer className="mt-12 text-center text-sm text-gray-500">
            Built by{" "}
            <a
              href="https://github.com/haider-patanwala"
              className="text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haider Patanwala
            </a>{" "}
            with 💜
          </footer>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, items, gradient }: any) {
  return (
    <div
      className={`rounded-lg bg-gradient-to-r ${gradient} p-6 transition-all duration-300
      hover:scale-[1.02]`}
    >
      <div className="mb-4 flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      </div>
      <ul className="space-y-2 text-gray-300">
        {items.map((item: any, index: number) => (
          <li
            key={index}
            className="flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ToolCard({ icon, title, description, link, linkText, gradient }: any) {
  return (
    <div
      className={`group rounded-lg bg-gradient-to-r ${gradient} p-6 transition-all duration-300
      hover:scale-[1.02]`}
    >
      <div className="mb-4 flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
      </div>
      <p className="mb-4 text-gray-300">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-blue-400 transition-colors
          hover:text-blue-300"
      >
        {linkText}
        <span className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>
  )
}

function ActionButton({ icon, text, link }: any) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-sm
        font-medium text-gray-200 transition-all hover:bg-gray-600"
    >
      {icon}
      {text}
    </a>
  )
}
export default Home