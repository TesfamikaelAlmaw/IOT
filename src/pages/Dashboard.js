import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WeatherForecast from "../components/WeatherForecast";

const Dashboard = () => {
  const crops = [
    { id: 1, name: "Wheat", image: "/asset/wheat_image.jpg" },
    { id: 2, name: "Rice", image: "/asset/rice1.jpg" },
    { id: 3, name: "Corn", image: "/asset/corn1.jpg" },
    { id: 4, name: "Soybeans", image: "/asset/soybeans1.jpg" },
    { id: 5, name: "Flower", image: "/asset/flower1.jpg" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <WeatherForecast />
        </div>
        <motion.div
          className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 1.5,
            ease: "easeOut",
          }}
        >
          {crops.map((crop) => (
            <Link to={`/crop/${crop.id}`} key={crop.id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
                }}
                className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 ease-in-out"
              >
                <motion.img
                  src={crop.image}
                  alt={`${crop.name} crop`}
                  className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out" />
                <motion.h3 className="absolute bottom-4 left-4 text-lg font-medium text-white group-hover:text-yellow-500 transition-colors duration-300 ease-in-out">
                  {crop.name}
                </motion.h3>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
