import HotelList from "./components/home/HotelList";

export default function Home({ searchParams }) {
  return (
    <>
      <HotelList searchParams={searchParams} />
    </>
  );
}
