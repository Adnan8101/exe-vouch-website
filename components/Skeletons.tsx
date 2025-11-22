export function VouchSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 animate-pulse h-full flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-[#2a2a2a] rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-[#2a2a2a] rounded w-32" />
          <div className="h-3 bg-[#2a2a2a] rounded w-24" />
        </div>
      </div>
      <div className="space-y-2 mb-4 flex-grow">
        <div className="h-4 bg-[#2a2a2a] rounded w-full" />
        <div className="h-4 bg-[#2a2a2a] rounded w-4/5" />
        <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
      </div>
      <div className="h-10 bg-[#2a2a2a] rounded-lg w-full" />
    </div>
  );
}

export function ProofSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-6 animate-pulse flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-[#2a2a2a] rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-[#2a2a2a] rounded w-32" />
          <div className="h-3 bg-[#2a2a2a] rounded w-24" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-[#2a2a2a] rounded w-full" />
        <div className="h-4 bg-[#2a2a2a] rounded w-3/4" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
        <div className="aspect-square bg-[#2a2a2a] rounded-lg" />
      </div>
      <div className="h-10 bg-[#2a2a2a] rounded-lg w-full" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] rounded-2xl p-6 animate-pulse flex flex-col items-center justify-center min-h-[140px]">
      <div className="w-10 h-10 bg-[#2a2a2a] rounded-full mb-3" />
      <div className="h-3 bg-[#2a2a2a] rounded w-20 mb-2" />
      <div className="h-8 bg-[#2a2a2a] rounded w-16" />
    </div>
  );
}

export function TeamMemberSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#1f1f1f] via-[#1a1a1a] to-[#0a0a0a] border-3 border-[#2a2a2a] rounded-2xl p-8 text-center animate-pulse">
      <div className="w-28 h-28 bg-[#2a2a2a] rounded-full mx-auto mb-4" />
      <div className="h-5 bg-[#2a2a2a] rounded w-32 mx-auto mb-2" />
      <div className="h-4 bg-[#2a2a2a] rounded w-24 mx-auto mb-2" />
      <div className="h-4 bg-[#2a2a2a] rounded w-40 mx-auto" />
    </div>
  );
}

export function FounderCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[#c9a76f]/40 via-[#1a1a1a] to-[#0a0a0a] border-4 border-[#c9a76f] rounded-3xl p-10 text-center animate-pulse max-w-sm mx-auto">
      <div className="w-32 h-32 bg-[#2a2a2a] rounded-full mx-auto mb-6" />
      <div className="h-6 bg-[#2a2a2a] rounded w-40 mx-auto mb-3" />
      <div className="h-4 bg-[#2a2a2a] rounded w-32 mx-auto mb-2" />
      <div className="h-4 bg-[#2a2a2a] rounded w-48 mx-auto" />
    </div>
  );
}
