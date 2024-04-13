import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HunterCard = ({hunter}) => {
  const [hunterEquipment, setHunterEquipment] = useState('');
  const weaponImage = hunterEquipment.weapon?.assets.image;
  const detailsPageRoute = `/${hunter.id}`
  const editPageRoute = `/${hunter.id}/edit`

  useEffect(() => {
    const fetchHunterEquipment = async () => {
      const weaponResponse = await axios.get(`https://mhw-db.com/weapons/${hunter.weaponId}`);
      const armorResponse = await axios.get(`https://mhw-db.com/armor/sets/${hunter.armorId}`);
      setHunterEquipment({
        weapon: weaponResponse.data,
        armor: armorResponse.data
      });
    }

    fetchHunterEquipment();

  }, [])

  return (
    <div key={hunter.id} className="hover:scale-110 transition-transform duration-300 ease-in-out overflow-hidden  shadow-inner rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto bg-[#1a1a1a]">
      <Link to={detailsPageRoute} className="w-full h-full flex flex-col items-center">
        <img src={weaponImage} alt={`${hunter.name}'s weapon of choice`} className="max-h-40"/>
        <h2 className="text-white text-m font-medium">Name: {hunter.name}</h2>
      </Link>
      <div className="flex items-center justify-center p-4">
        <Link to={editPageRoute}>
          <button type="button" className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
 
export default HunterCard;