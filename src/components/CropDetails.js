import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const CropDetails = () => {
  const { id } = useParams();

  const cropDetails = {
    1: {
      name: "wheat",
      temperature: "20°C",
      waterLevel: "Medium",
      soilPH: "6.5",
      light: "High",
    },
    2: {
      name: "Rice",
      temperature: "25°C",
      waterLevel: "High",
      soilPH: "5.8",
      light: "Medium",
    },
    3: {
      name: "Corn",
      temperature: "21°C",
      waterLevel: "Medium",
      soilPH: "6.8",
      light: "High",
    },
    4: {
      name: "Soybeans",
      temperature: "21°C",
      waterLevel: "Medium",
      soilPH: "5.8",
      light: "Medium",
    },
    5: {
      name: "flower",
      temperature: "21°C",
      waterLevel: "Low",
      soilPH: "5.8",
      light: "High",
    },
  };

  const crop = cropDetails[id];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cropImages = [
    `/asset/${crop?.name.toLowerCase()}1.jpg`,
    `/asset/${crop?.name.toLowerCase()}2.jpg`,
    `/asset/${crop?.name.toLowerCase()}3.jpg`,
  ];

  useEffect(() => {
    if (crop) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % cropImages.length
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [cropImages.length, crop]);

  if (!crop) {
    return <p className="text-center text-lg">Crop not found</p>;
  }

  const conditionImages = {
    temperature: {
      "20°C": "/asset/weather1.png",
      "25°C": "/asset/weather1.png",
      "21°C": "/asset/weather1.png",
      "15°C": "/asset/weather1.png",
    },
    waterLevel: {
      Low: "/asset/water level.jpg",
      Medium: "/asset/water level.jpg",
      High: "/asset/water level.jpg",
    },
    soilPH: {
      6.5: "/asset/ph.png",
      5.8: "/asset/ph.png",
      6.8: "/asset/ph.png",
      7.0: "/asset/ph.png",
    },

    light: {
      High: "/asset/light.png",
      Medium: "/asset/light.png",
    },
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        {crop.name} Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={conditionImages.temperature[crop.temperature]}
              alt="Temperature"
              className="w-16 h-16 rounded-full"
            />
            <p className="text-lg font-medium text-gray-700">
              <strong>Temperature:</strong> {crop.temperature}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src={conditionImages.waterLevel[crop.waterLevel]}
              alt="Water Level"
              className="w-16 h-16 rounded-full"
            />
            <p className="text-lg font-medium text-gray-700">
              <strong>Water Level:</strong> {crop.waterLevel}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src={conditionImages.soilPH[crop.soilPH]}
              alt="Soil pH"
              className="w-16 h-16 rounded-full"
            />
            <p className="text-lg font-medium text-gray-700">
              <strong>Soil pH:</strong> {crop.soilPH}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src={conditionImages.light[crop.light]}
              alt="Light Intensity"
              className="w-16 h-16 rounded-full"
            />
            <p className="text-lg font-medium text-gray-700">
              <strong>Light Intensity:</strong> {crop.light}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg overflow-hidden shadow-lg"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <img
            src={cropImages[currentImageIndex]}
            alt={crop.name}
            className="w-full h-64 object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CropDetails;
