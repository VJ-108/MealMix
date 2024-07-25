import { createClient } from "pexels";

const getPhoto = async (query) => {
  const client = createClient(process.env.PEXELS_API_KEY);
  try {
    const data = await client.photos.search({ query, per_page: 1 });
    return data?.photos[0]?.src?.landscape || null;
  } catch (error) {
    console.error("Error fetching photo:", error);
    return null;
  }
};

export default getPhoto;
