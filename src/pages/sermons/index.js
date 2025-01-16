import { useEffect, useState } from "react";
import { LeftArrow, RightArrow, SearchIcon } from "../../components";
import sermons_data from "../../data/all.json";
import { NavLink } from "@mantine/core";

const FILTERS = [
  { label: "Most recent", key: "recent" },
  { label: "Oldest", key: "oldest" },
  { label: "Year", key: "year" },
  { label: "Preachers", key: "preachers" },
];

export function Sermons() {
  const [sermons, setSermons] = useState(sermons_data);
  const [filter, setFilter] = useState(FILTERS[0]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const years = [...new Set(sermons_data.map((item) => item.year))];
  const preachers = [
    ...new Set(sermons_data.map((item) => item.preachers).flat()),
  ];

  const pageSize = 12;
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
      const s = search.toLowerCase().trim();
      setPage(1);
      setSermons(() => {
        return sermons_data.filter(
          (item) =>
            item.series.toLowerCase().includes(s) ||
            item?.description?.toLowerCase()?.includes(s)
        );
      });
    } else {
      setSermons(sermons_data);
    }
  }, [search]);

  // useEffect(() => {
  //   fetch("https://theedifyingassembly.com/api/v1/entity/all.json")
  //     .then((response) => response.json())
  //     .then((response) => setSermons(response))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <main className="container max-w-80 sm:max-w-2xl lg:max-w-6xl mx-auto pt-10 sm:pt-20">
      <section className="flex flex-wrap gap-5 items-center justify-between mb-10">
        <NavLink
          label="Home page"
          href="/"
          className="w-fit"
          leftSection={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 18v-3M10.07 2.82 3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          }
        />
        <NavLink
          label="Songs page"
          href="/songs"
          className="w-fit"
          leftSection={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.28 22a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M20.84 16.8V4.6c0-2.6-1.63-2.96-3.28-2.51l-6.24 1.7C10.18 4.1 9.4 5 9.4 6.3v12.57"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17.72 19.92a3.12 3.12 0 1 0 0-6.24 3.12 3.12 0 0 0 0 6.24ZM9.4 9.52 20.84 6.4"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          }
        />
      </section>
      <section className="flex flex-wrap gap-5 justify-center items-center">
        <div className="relative text-gray-600 w-fit">
          <input
            className="bg-[#f5f6f7] h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
            placeholder="Search Sermons"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </div>
        {/* <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              variant="default"
              leftSection={<FilterLines />}
              radius="xl"
              color="gray"
            >
              Arrange by
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            {FILTERS.map((item) => {
              return (
                <Menu.Item
                  key={item.key}
                  disabled={item.key === "preachers"}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                </Menu.Item>
              );
            })}
          </Menu.Dropdown>
        </Menu> */}
      </section>
      {/* {filter === "year" && (
        <section className="mx-auto">
          <SegmentedControl
            // value={value}
            // onChange={setValue}
            mx="auto"
            data={[
              { label: "React", value: "react" },
              { label: "Angular", value: "ng" },
              { label: "Vue", value: "vue" },
              { label: "Svelte", value: "svelte" },
            ]}
          />
        </section>
      )} */}
      {/* <section className="flex flex-wrap gap-10 mt-10 mx-auto justify-center">
        {years.map((item) => {
          return <button key={item}>{item}</button>;
        })}
      </section> */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
        {sermons.slice(pageStart, pageEnd).map((item, index) => {
          return (
            <a
              href={`/sermons?sermon_series=${item.slug}-${item.year}`}
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
                  {item?.description
                    ? `(${item.description})`
                    : item?.year
                    ? `(${item.year})`
                    : ""}
                </h4>
              </div>
            </a>
          );
        })}
      </section>
      <section className="w-10/12 mx-auto my-14">
        <div>
          <p className="text-center text-gray-500 text-sm">
            Showing {pageStart + 1} to {count < pageSize ? count : pageEnd} of{" "}
            {count} sermon series
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

export function Image({ item }) {
  const [error, setError] = useState(false);

  return (
    <img
      loading="lazy"
      src={error ? "tea-cover.png" : `../sermon/images/${item.image_url}`}
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
