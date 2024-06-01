import { Cloudinary } from "@cloudinary/url-gen/index";
import { Trip } from "../../types";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { uwConfig } from "../../../../components/utilities/uploadWidget/CloudinaryUploadWidget";

export interface TripFieldProps {
  tripKey: string;
  trip: Trip;
}
export const TripField: React.FC<TripFieldProps> = (props) => {
  const { trip, tripKey } = props;

  const cld = new Cloudinary({
    cloud: {
      cloudName: uwConfig.cloudName,
    },
  });
  
  let fieldValue;
  if (trip && trip[tripKey as keyof Trip]) {
    if (tripKey === "_id") {
      // do nothing
    } else if (tripKey == "image") {
      const image = cld.image(trip?.image);
      fieldValue = (
        <AdvancedImage
          style={{ maxWidth: "100px" }}
          cldImg={image}
          plugins={[responsive(), placeholder()]}
        />
      );
    } else if (tripKey == "tags") {
      fieldValue = trip.tags.join(", ");
    } else {
      fieldValue = <span>{String(trip[tripKey as keyof Trip])}</span>;
    }
  }

  return (
    fieldValue && (
      <div>
        <span style={{fontWeight:600}}>{tripKey}: </span>
        <span>{fieldValue}</span>
      </div>
    )
  );
};
