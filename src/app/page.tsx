import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src="/next.svg" alt="Logo" className="h-8 w-auto" />
          <span className="text-gray-900 text-xl font-semibold">HOUSE.AI</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Ask anything,
            <br />
            <span className="text-green-700">
              get neighborhood intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            AI-powered research that understands what you really need to know about any area
          </p>
        </div>

        {/* CTA */}
        <Link href="/housing">
          <Button className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 text-lg rounded-xl font-medium">
            Try the Intelligence Grid →
          </Button>
        </Link>

        {/* Example queries */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center max-w-3xl">
          {['bloomsbury student uni safe cheap', 'stratford young professional commute', 'camden family friendly schools'].map((example) => (
            <div
              key={example}
              className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm"
            >
              "{example}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
