import { useEffect, useRef } from 'react';

const UploadWidget = () => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary;
    console.log('cloudinaryRef,current', cloudinaryRef.current)
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'da127ahf2',
      uploadPreset: 'lq0csing'
    }, function(error: any, result: any) {
        console.log('error', error)
      console.log('result', result);
      // Handle the result or error here
    });
  }, []);

  return (
    <button onClick={() => widgetRef.current.open()}>Upload</button>
  )
  
};

export default UploadWidget;
