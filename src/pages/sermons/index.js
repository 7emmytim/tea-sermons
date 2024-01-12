import { useEffect, useState } from "react";
import { LeftArrow, RightArrow, SearchIcon } from "../../components";
import { sermons_data } from "../../data";

export function Sermons() {
  const [sermons, setSermons] = useState(sermons_data);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 8;
  const pageStart = (page - 1) * pageSize;
  const pageEnd = page * pageSize;
  const count = sermons.length;
  const pages = count / pageSize;

  function nextPage() {
    window.scrollTo({ top: 0 });
    setPage((prev) => (prev < count ? prev + 1 : prev));
  }

  function previousPage() {
    window.scrollTo({ top: 0 });
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }

  useEffect(() => {
    if (search) {
      setSermons(() => {
        return sermons_data.filter((item) =>
          item.series.toLowerCase().includes(search.toLowerCase())
        );
      });
    } else {
      setSermons(sermons_data);
    }
  }, [search]);

  return (
    <main className="container max-w-7xl mx-auto pt-20">
      <div className="pt-2 relative mx-auto text-gray-600 w-fit">
        <input
          className="bg-[#f5f6f7] h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
          placeholder="Search Sermons"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon />
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-20">
        {sermons.slice(pageStart, pageEnd).map((item, index) => {
          return (
            <a
              href={`/sermon-archives?sermon_series=${item.slug}`}
              key={`${item.slug} ${index}`}
              className="p-2 hover:bg-[#f5f6f7] cursor-pointer rounded"
            >
              <div className="relative aspect-square bg-gray-100 shadow shadow-slate-200">
                <Image item={item} />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-[#323233] truncate">
                  {item.series}
                </h3>
                <h4 className="font-light text-[#747578] text-sm mt-1">
                  {item?.description ? `(${item.description})` : ""}
                </h4>
              </div>
            </a>
          );
        })}
      </section>
      <section className="w-10/12 mx-auto my-14">
        <div>
          <p className="text-center text-gray-500 text-sm">
            Showing 1 to {pageSize} of {count} sermon series
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          <button
            className="hover:bg-[#f5f6f7] rounded-full p-3"
            onClick={previousPage}
          >
            <LeftArrow height={15} />
          </button>

          {page > 1 && (
            <button
              onClick={previousPage}
              className="h-10 w-10 rounded-full hover:bg-[#f5f6f7]"
            >
              {page - 1}
            </button>
          )}

          <button className="h-10 w-10 rounded-full bg-[#222] text-white">
            {page}
          </button>

          {page < pages && (
            <button
              onClick={nextPage}
              className="h-10 w-10 rounded-full hover:bg-[#f5f6f7]"
            >
              {page + 1}
            </button>
          )}

          {/* {Array.from({ length: pages }).map((_, index) => {
            const item = index + 1;
            return (
              <button
                key={index}
                className={`h-10 w-10 rounded-full ${
                  page === item ? "bg-[#222] text-white" : "hover:bg-[#f5f6f7]"
                }`}
                onClick={() => changePage(item)}
              >
                {item}
              </button>
            );
          })} */}

          <button
            className="hover:bg-[#f5f6f7] rounded-full p-3"
            onClick={nextPage}
          >
            <RightArrow height={15} />
          </button>
        </div>
      </section>
    </main>
  );
}

function Image({ item }) {
  const [error, setError] = useState(false);

  return (
    <img
      loading="lazy"
      src={error ? "/tea-cover.png" : `../sermon/images/${item.image_url}`}
      alt={item.series}
      className="object-cover rounded-lg"
      onError={(err) => {
        if (err) {
          setError(true);
        } else {
          setError(false);
        }
      }}
    />
  );
}
