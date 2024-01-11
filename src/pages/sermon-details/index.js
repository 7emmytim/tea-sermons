import { BackIcon, DownloadIcon } from "../../components";
import { sermons_data } from "../../data";

export function SermonDetails({ param }) {
  const sermon = sermons_data.find((item) => item.slug === param);

  return (
    <main className="container max-w-3xl mx-auto pt-20">
      {/* <section className="mt-20">
        <img
          src={`../sermon/images/${sermon.image_url}`}
          alt={sermon.series}
          className="rounded-lg w-full h-72 object-cover"
        />
      </section> */}
      <a
        href="/sermon-archives"
        className="flex items-center gap-2 text-cyan-600"
      >
        <BackIcon />
        <p>All Sermons</p>
      </a>
      <h1 className="text-center font-bold text-3xl mt-10">{sermon.series}</h1>
      <section className="bg-gray-50 py-5 rounded-lg mt-5">
        <div className="divide-y divide-gray-100">
          {sermon.tracks.map(({ title, track_number, url }) => (
            <a
              key={track_number}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex justify-between gap-x-6 py-5 px-5 sm:px-10 cursor-pointer hover:bg-white"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {title ?? `Track ${track_number}`}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {/* {track.email} */}
                    {sermon.preachers[0]}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <DownloadIcon />
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
