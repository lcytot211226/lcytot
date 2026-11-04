// Site-wide background, rendered once from app/layout.tsx behind every route:
// three large blurred colour blobs drifting slowly (keyframes in globals.css).
// Colours come from the project app icons: Subanote blue, scooter-app purple, sky.

export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-drift-a absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-[#799ef6]/[0.18] blur-3xl dark:bg-[#799ef6]/[0.12]" />
      <div className="bg-drift-b absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-[#7c3aed]/[0.12] blur-3xl dark:bg-[#7c3aed]/[0.12]" />
      <div className="bg-drift-c absolute bottom-[-200px] left-1/3 h-[420px] w-[420px] rounded-full bg-sky-300/[0.15] blur-3xl dark:bg-sky-500/[0.06]" />
    </div>
  );
}
