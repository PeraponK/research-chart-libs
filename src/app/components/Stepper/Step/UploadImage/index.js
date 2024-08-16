import React, { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const StepUploadImage = ({ onImageUpdate }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [crop, setCrop] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const avatarUrl = useRef("");

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    // console.log("file", file);
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      setImgSrc(imageUrl);
      // console.log("imageURL", imageUrl);
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

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    const image = imgRef.current;

    if (imgSrc && crop && canvas && image) {
      setCanvasPreview(
        image, // HTMLImageElement
        canvas, // HTMLCanvasElement
        convertToPixelCrop(crop, image.width, image.height)
      );
      const dataUrl = canvas.toDataURL();
      // console.log("dataUrl", dataUrl);
      updateAvatar(dataUrl);
      onImageUpdate(dataUrl);
    }
  }, [imgSrc, crop, onImageUpdate]);

  const setCanvasPreview = (
    image, // HTMLImageElement
    canvas, // HTMLCanvasElement
    crop
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    // Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    ctx.restore();
  };

  return (
    <div>
      {/* <img src={avatarUrl.current} alt="Avatar" width={200} height={200} /> */}
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {imgSrc && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            // circularCrop
            keepSelection
            // aspect={ASPECT_RATIO}
            // minWidth={MIN_DIMENSION}
          >
            <img ref={imgRef} src={imgSrc} alt="Upload" onLoad={onImageLoad} />
          </ReactCrop>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            // display: "none",
            border: "1px solid black",
            // objectFit: "contain",
            width: 400,
            height: 400,
          }}
        />
      )}
    </div>
  );
};

export default StepUploadImage;
