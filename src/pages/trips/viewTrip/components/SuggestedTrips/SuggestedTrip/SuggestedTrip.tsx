import { useNavigate } from "react-router-dom";
import { Trip } from "../../../../types";
import { useCallback } from "react";
import styles from "../SuggestedTrips.module.scss";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Country } from "country-state-city";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { uwConfig } from "../../../../../../components/utilities/uploadWidget/CloudinaryUploadWidget";

export const SuggestedTrip: React.FC<Trip> = (props) => {
  const { _id, title, country, image, tags } = props;
  const navigate = useNavigate();
  const onSuggestionClick = useCallback((id: string) => {
    navigate(`/trips/${id}`);
  }, []);

  const cld = new Cloudinary({
    cloud: {
      cloudName: uwConfig.cloudName,
    },
  });
  const displayedImage = image && cld.image(image).createCloudinaryURL();
  return     <Card sx={{ maxWidth: 345 }}  className={styles.trip} onClick={() => onSuggestionClick(_id)}>
    <CardMedia
      component="img"
      height="140"
      image={displayedImage}
    />
    <CardContent>
      <div className={styles.content}>
      <Typography gutterBottom variant="h5" component="div">
      {`${title ? title : ""} ${
          country ? Country.getCountryByCode(country)?.flag : ""
        }`}
      </Typography>
      {tags && <div>
            <span>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </span>
      </div>}
      </div>
    </CardContent>
</Card>
};
