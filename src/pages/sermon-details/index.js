import { Center, Stack, Text } from "@mantine/core";
import { BackIcon, DownloadIcon } from "../../components";
import sermons_data from "../../data/all.json";
import { Image } from "../sermons";

export function SermonDetails({ param }) {
  const sermon = sermons_data.find(
    (item) => `${item.slug}-${item.year}` === param
  );

  if (!sermon)
    return (
      <Center className="h-screen">
        <Stack>
          <Text className="text-xl">Page not found ):</Text>
          <a href="/sermons" className="text-center text-blue-400">
            Back to all sermons
          </a>
        </Stack>
      </Center>
    );

  return (
    <main className="container max-w-3xl mx-auto pt-10 sm:pt-20">
      <a
        href="/sermons"
        className="flex items-center gap-2 text-gray-600 justify-center text-xs sm:text-base"
      >
        <BackIcon />
        <p>All Sermons</p>
      </a>
      <h1 className="text-center font-bold text-xl sm:text-3xl mt-10">
        {sermon.series}{" "}
        {sermon?.description
          ? `(${sermon.description})`
          : sermon?.year
          ? `(${sermon.year})`
          : ""}
      </h1>
      <section className="my-5 aspect-square h-40 sm:h-64 mx-auto bg-[#f5f6f7] rounded p-1 sm:p-3 shadow-lg">
        <Image item={sermon} />
      </section>
      <section className="py-5 rounded-lg">
        {sermon.tracks.length ? (
          <div className="divide-y divide-gray-100">
            {sermon.tracks.map(({ title, track_number, url, preacher }) => (
              <a
                key={track_number}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-x-6 py-5 px-5 sm:px-10 cursor-pointer hover:bg-gray-50"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-xs sm:text-sm font-semibold leading-6 text-gray-900">
                      {title ?? `Track ${track_number}`}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {/* {track.email} */}
                      {/* {sermon.preachers[0]} */}
                      {preacher ?? sermon.preachers[0] ?? ""}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex flex-col items-end">
                  <DownloadIcon />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-xl text-center">
              Tracklist for this sermon is empty ):
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
