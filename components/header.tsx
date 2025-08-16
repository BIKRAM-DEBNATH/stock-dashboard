export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SM</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Stock Market Dashboard</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-slate-600">Live Market Data</div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    </header>
  )
}
