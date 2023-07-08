import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { gravity } from '@cloudinary/url-gen/qualifiers/gravity';

function CloudinaryUploadWidget() {
    const [imageUrl, setImageUrl] = useState('');
    // const { actions } = useContext(Context); 

    // function sendimage(img){
    //     actions.sentimg(img)
    // }

    useEffect(() => {
        const cloudName = "dgi4flmpb"; 
        const uploadPreset = "CardTracker";

        const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            const secureUrl = result.info.secure_url;
            setImageUrl(secureUrl);
            }
        }
        );

        document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
            myWidget.open();
        }, 
        false);

        return () => {
        document.getElementById("upload_widget").removeEventListener("click", myWidget.open);
        };
    }, []);

    return (
        <>
        <button id="upload_widget" className="cloudinary-button">
            Upload Image
        </button>
        {imageUrl !== '' ? <img src={imageUrl} style={{ width: "600px" }} /> : ''}
        </>
    );
    }

export default CloudinaryUploadWidget;
