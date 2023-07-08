import React from "react";
import { Link } from "react-router-dom";
import { FormGroup, Label, FormText, Input } from "reactstrap";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "./cloudinaryWidget";


export const ProfileImage = () => {

    return (
        <>
            <CloudinaryUploadWidget />
            <div className="container d-flex justify-content-center my-3">
                <FormGroup className="w-50">
                    <Label for="exampleFile">
                    Sube tu imagen
                    </Label>
                    <Input
                        id="exampleFile"
                        name="file"
                        type="file"
                        // onChange={uploadImage}
                    />
                    <FormText>
                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                    </FormText>
                </FormGroup>
            </div>
        </>
	);
};