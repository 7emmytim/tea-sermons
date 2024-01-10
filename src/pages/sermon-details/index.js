import { useParams } from "react-router-dom";
import { sermons_data } from "../../data";

export function SermonDetails() {
  const { slug } = useParams();
  const sermon = sermons_data.find((item) => item.slug === slug);

  return (
    <main className="container max-w-7xl mx-auto">
      <section className="mt-20">
        <img
          src={`${sermon.image_url}`}
          alt={sermon.series}
          className="rounded-lg w-full h-72 object-cover"
        />
      </section>
    </main>
  );
}
