export default function SkeletonCard() {
  return (
    <div className="bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl shimmer" />
        <div className="w-8 h-8 rounded-lg shimmer" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-32 rounded shimmer" />
        <div className="h-5 w-20 rounded-full shimmer" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded shimmer" />
        <div className="h-3 w-4/5 rounded shimmer" />
      </div>
      <div className="border-t border-[#1E1E2E] pt-3 flex items-center justify-between">
        <div className="h-5 w-16 rounded-full shimmer" />
        <div className="h-4 w-20 rounded shimmer" />
      </div>
    </div>);

}