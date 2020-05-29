import React, { useRef, useState, useEffect } from "react";

import Button from './Button';
import "./ImageUpload.css";

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setisValid] = useState(false);

    const filePickerRef = useRef(); 

    useEffect(() => {
        if (!file) { 
            return;
        }
        const fileReader = new FileReader(); //browser side js
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }; //pseudo callback that runs when function below is called
        fileReader.readAsDataURL(file);
    }, [file]);



    const pickedHandler = (event) => {
        //console.log(event.target.files);
        let pickedFile;
        let fileIsValid = isValid;
        // event.target.files stores the file that use uploaded
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setisValid(true);
            fileIsValid = true;
        } else {
            setisValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: "none" }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />

            <div className={`image-upload ${props.center && "center"}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p> Place pick an image </p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>

            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;