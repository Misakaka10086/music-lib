"use client";
import { useEffect, useState } from "react";
import { getSignedImageUrl } from "@/app/lib/s3Service";
import Image from "next/image";

export default function ExperimentPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getSignedImageUrl("tangyuxiaobao", "20241229@0.25x.png");
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Image
        src={imageUrl}
        alt="S3 Image"
        width={100}
        height={100}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
