import TexasMap from "@/components/TexasMap";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-start pt-20 pb-40">
      <div className="w-full max-w-6xl px-6 text-center mb-16">
        <h1 className="text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
          Texas <span className="text-blue-600">Defense</span> Data
        </h1>
        <p className="text-xl text-slate-500 mt-6 font-bold max-w-2xl mx-auto leading-relaxed">
          An interactive visualization of indigent defense management systems across 254 Texas counties.
        </p>
      </div>

      {/* The component itself handles its own max-width and centering */}
      <div className="w-full">
        <TexasMap />
      </div>
    </main>
  );
}