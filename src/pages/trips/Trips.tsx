import { TripsFeed } from "./components/TripsFeed/TripsFeed";
export const Trips = () => {

  return (
    <div>
      <TripsFeed
        trips={[
          {
            country: "US",
            description: "fun trip",
            name: "my fun trip to the us",
            tags: ["lala"],
            id: "1",
          },
        ]}
        isLoading={false}
      />
    </div>
  );
};
