export default function PageShell({ children, darkNav: _darkNav }: { children: React.ReactNode; darkNav?: boolean }) {
  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white">
      {children}
    </div>
  );
}
