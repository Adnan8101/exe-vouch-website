export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-[#c9a76f]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#c9a76f] border-t-transparent animate-spin"></div>
        </div>
        <p className="text-[#c9a76f] font-semibold">Loading...</p>
      </div>
    </div>
  );
}
