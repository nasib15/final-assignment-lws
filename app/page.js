import HotelList from "./components/home/HotelList";

export default async function Home({ searchParams }) {
  // Next.js 16 requires request-time APIs to be awaited.
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <HotelList searchParams={resolvedSearchParams} />
    </>
  );
}
