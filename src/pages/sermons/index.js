import { useState } from "react";
import { LeftArrow, RightArrow } from "../../components";
import { sermons_data } from "../../data";

export function Sermons() {
  const [page, setPage] = useState(1);

  function changePage(page) {
    setPage(page);
  }

  function nextPage() {
    setPage((prev) => (prev < 4 ? prev + 1 : prev));
  }

  function previousPage() {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }

  return (
    <main className="container max-w-7xl mx-auto">
      <section className="grid grid-cols-4 gap-5 mt-20">
        {sermons_data.map((item, index) => {
          return (
            <a
              href={`/sermon-archives/${item.slug}`}
              key={`${item.slug} ${index}`}
              className="p-2 hover:bg-[#f5f6f7] cursor-pointer rounded"
            >
              <div className="relative aspect-square">
                <img
                  src={`../sermon/images/${item.image_url}`}
                  alt={item.series}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-[#323233]">{item.series}</h3>
                <h4 className="font-light text-[#747578] text-sm mt-1">
                  {item.preachers[0]}
                </h4>
              </div>
            </a>
          );
        })}
      </section>
      <section className="w-10/12 mx-auto my-10">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className="hover:bg-[#f5f6f7] rounded-full p-3"
            onClick={previousPage}
          >
            <LeftArrow height={15} />
          </button>

          {[1, 2, 3, 4].map((item) => {
            return (
              <button
                key={item}
                className={`h-10 w-10 rounded-full ${
                  page === item ? "bg-[#222] text-white" : "hover:bg-[#f5f6f7]"
                }`}
                onClick={() => changePage(item)}
              >
                {item}
              </button>
            );
          })}

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
