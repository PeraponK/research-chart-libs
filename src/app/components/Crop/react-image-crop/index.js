import React, { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./setCanvas";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const Cropper = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const avatarUrl = useRef("");
  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      //   imageElement.addEventListener("load", (e) => {
      //     if (error) setError("");
      //     const { naturalWidth, naturalHeight } = e.currentTarget;
      //     if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      //       setError("Image must be at least 150 x 150 pixels.");
      //       return setImgSrc("");
      //     }
      //   });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <img src={avatarUrl.current} alt="Avatar" width={200} height={200} />
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {imgSrc && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            // circularCrop
            keepSelection
            // aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              //   style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            onClick={() => {
              setCanvasPreview(
                imgRef.current, // HTMLImageElement
                previewCanvasRef.current, // HTMLCanvasElement
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              updateAvatar(dataUrl);
            }}
          >
            next
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default Cropper;
