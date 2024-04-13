import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import axios from "axios";

const HunterDetails = () => {

  const isInitialMount = useRef(true);
  const [hunter, setHunter] = useState([]);
  const [hunterEquipment, setHunterEquipment] = useState({});
  const { hunterId } = useParams();
  const pathToEditPage = `/${hunterId}/edit`;

  // get hunter data from supabase
  useEffect(() => {
    const getHunterDataFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("Hunters")
          .select()
          .eq("id", hunterId);
        setHunter(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getHunterDataFromSupabase();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const fetchHunterEquipment = async () => {
        const weaponResponse = await axios.get(`https://mhw-db.com/weapons/${hunter[0]?.weaponId}`);
        const armorResponse = await axios.get(`https://mhw-db.com/armor/sets/${hunter[0]?.armorId}`);
        setHunterEquipment({
          weapon: weaponResponse.data,
          armor: armorResponse.data
        });
      }
      fetchHunterEquipment();
    }
  }, [hunter])

  console.log(hunter);
  console.log(hunterEquipment);

  return (
    <div>
      <div>
        <h1>Hunter Details</h1>
        <h2 className="text-2xl font-bold text-center my-4">Name: {hunter[0]?.name}</h2>
        <div>
          <h2 className="text-2xl font-bold text-center my-4">Weapon: {hunterEquipment.weapon?.name}</h2>
          <img src={hunterEquipment.weapon?.assets.image} alt="" />
          <h2>Weapon Type: {hunterEquipment.weapon?.type}</h2>
          <p>Total Attack: {hunterEquipment.weapon?.attack.display}</p>
          <p>Raw Attack: {hunterEquipment.weapon?.attack.raw}</p>
          <p>Damage Type: {hunterEquipment.weapon?.damageType}</p>
          <p>Element Type: {hunterEquipment.weapon?.elements[0]?.type}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center my-4">Armor: {hunterEquipment.armor?.name}</h2>
          {hunterEquipment.armor?.pieces.map((piece, i) => (
            <div className="flex">
              <img src={piece?.assets?.imageMale} alt="" />
              <div>
                <p>Piece Name: {piece.name}</p>
                {piece.skills.map((skill, i) => (
                  <p key={i}>Skill: {skill.skillName}</p>
                ))}
                <p>Type: {piece?.type}</p>
              </div>
              <img src={piece?.assets?.imageFemale} alt="" />
            </div>
          ))}
        </div>

      </div>

      <div>
        <Link to={pathToEditPage}>
          <button
            type="button"
            className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
 
export default HunterDetails;