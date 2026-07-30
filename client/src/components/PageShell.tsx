export default function PageShell({ children, darkNav: _darkNav }: { children: React.ReactNode; darkNav?: boolean }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full max-w-[100vw]">
      {children}
    </div>
  );
}
