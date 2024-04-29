import './App.css'
import CloudinaryUploadWidget from './components/utilities/uploadWidget/CloudinaryUploadWidget';

function upload(s: string) {
  console.log('updated!!! ' + s);
}
export const App = () => {

  return (
    <>
      <h1>
          Baot travel
      </h1>
      <CloudinaryUploadWidget setPublicId={upload}/>
    </>
  );
}