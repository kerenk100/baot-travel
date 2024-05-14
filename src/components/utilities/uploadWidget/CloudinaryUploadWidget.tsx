import { createContext, useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import { Button, IconButton } from '@mui/material';
import './uploadWidget.css';
import { Close } from "@mui/icons-material";
// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext({ loaded: false });


const uwConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_PRESET || ''
}

interface CLoudinaryUploadWidgetProps {
  setPublicId: (publicId: string) => void;
  buttonLabel?: string; // Optional button label prop
}

function CloudinaryUploadWidget({ setPublicId,  buttonLabel = 'Upload' }: CLoudinaryUploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const [publicId, setPublicIdInner] = useState('');

  const cld = new Cloudinary({
    cloud: {
      cloudName: uwConfig.cloudName
    }
  });

  const image = cld.image(publicId);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = (e: Event) => {
    e.preventDefault();
    if (loaded) {
      var widget = (window as any).cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            const publicId = result.info.public_id;
            setPublicIdInner(publicId);
            setPublicId(publicId);
          }
        }
      );

      widget.open();
    }
  };

  const onRemove = () => {
    setPublicIdInner('');
    setPublicId('');
  }

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <div className='widget-container'>
        <Button
          id="upload_widget"
          className="cloudinary-button"
          onClick={initializeCloudinaryWidget}
        >
           {buttonLabel} {/* Use the prop value as the button label */}
        </Button>
        <div style={{ display: !publicId ? 'none' : 'flex' }} className="thumbnail">
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={image}
            plugins={[responsive(), placeholder()]}
          />

         <IconButton style={{ backgroundColor: 'white', position: 'absolute', top: 5, right: 5, zIndex: 1200, height: 15, width: 15 }} onClick={onRemove}>
          <Close />
        </IconButton> 
        </div>
      </div>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
