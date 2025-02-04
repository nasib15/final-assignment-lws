export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-160px)]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
