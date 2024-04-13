import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { supabase } from '../supabaseClient';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

const EditHunter = () => {

  const params = useParams();
  console.log(params.hunterId);

  const [name, setName] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState();
  const [displayedWeapon, setDisplayedWeapon] = useState('None Selected');
  const [armorId, setArmorId] = useState();

  const [armorSets, setArmorSets] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [weaponType, setWeaponType] = useState();

  // hard-coded weapon types so that user can select from this array
  const weaponTypes = ['great-sword', 'long-sword', 'sword-and-shield', 'dual-blades', 'hammer', 'hunting-horn', 'lance', 'gunlance', 'switch-axe', 'charge-blade', 'insect-glaive', 'light-bowgun', 'heavy-bowgun', 'bow']
  
  // Ensures that weapon data isn't fetched on initial render
  const prevWeaponType = useRef();  

  // fetch weapon data once weapon type is updated
  useEffect(() => {
    // run only if weaponType has changed and isn't the initial render
    if (prevWeaponType.current !== weaponType) {
      const fetchWeaponData = async () => {
        // Form request URL based on user-selected weapon type
        const url = new URL('https://mhw-db.com/weapons');
        url.searchParams.set('p', JSON.stringify({
          id: true,
          name: true,
          type: true,
          assets: true
        }))
        url.searchParams.set('q', JSON.stringify({
          type: weaponType
        }));
  
        // Fetch the weapon data
        const weaponData = await axios.get(url.toString());
  
        // Map the weapon data to a new array of objects
        const arrayOfWeapons = weaponData.data.map((weapon) => {
          return {
            id: weapon.id,
            name: weapon.name,
            type: weapon.type,
            assets: weapon.assets
          }
        });
        
        setWeapons(arrayOfWeapons);
      }

      fetchWeaponData();
    }
    // Update ref to current weaponType after running effect
    prevWeaponType.current = weaponType;
    
  }, [weaponType])

  // update weapon type state when user selects a weapon type
  const updateWeaponType = (event) => {
    setWeaponType(event.target.value); 
    setSelectedWeapon(undefined);
  }

  const updateSelectedWeapon = (event) => {
    // if user hasn't selected a weapon yet, weapon is undefined and prompts user to select a weapon
    if (event.target.value === 'None Selected') {
      setSelectedWeapon(undefined);
    } else {
      // otherwise, update selected weapon and displayed weapon
      setSelectedWeapon(event.target.value);
      setDisplayedWeapon(event.target.value);
    }
  }
  
  // fetch armor data on component mount
  useEffect(() => {
    const fetchArmorData = async () => {
      const response = await axios.get('https://mhw-db.com/armor/sets?p={"id":true,"name":true}&q={"rank":"high"}');
      const arrayOfArmorSets = response.data.map((armorSet) => {
        return {
          id: armorSet.id,
          name: armorSet.name
        }
      })
      setArmorSets(arrayOfArmorSets);
    }
    fetchArmorData();
  }, [])

  const updateSelectedArmor = (event) => {
    if (event.target.value === 'None Selected') {
      setArmorId(undefined);
    } else {
      setArmorId(event.target.value);
    }
  }

  const updateName = (event) => {
    setName(event.target.value);
  }

  const createRowInSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("Hunters")
        .insert([{ name: name, weaponId: selectedWeapon, armorId: armorId }])
        .select('*');
      notify();
    } catch (error) {
      console.log("Error inserting hunter: ", error.message);
      toast.error("Error creating hunter!",)
    }
  };

  const notify = () =>
    toast.success("Hunter Created!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });


  return ( 
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1>Edit Your Hunter</h1>
        <img src="/monster-hunter-world-review_ghem.1280 (1).png" alt="Create Hunter Banner" className='h-96 w-auto mt-10'/>
      </div>
      {/* User Input */}
      <div>
        <div className="flex items-center justify-center gap-4">
          <div>
            <label>
              <h3>Name:</h3>
              <input type="text" name="name" value={name} id="name" placeholder="Enter your hunter's name!" onChange={updateName}/>
            </label>
          </div>

          <div>
            <label>
              <h3>Weapon Type:</h3>
              <select name="weaponType" onChange={updateWeaponType}>
                <option value="None Selected">Select a Weapon Type</option>
                {weaponTypes.map((weaponType, i) => (
                  <option value={weaponType} key={i}>
                    {weaponType}
                  </option>
                ))}
              </select>
              {(weaponType !== 'None Selected' && weaponType) && (
                <label>
                  <h3> Weapon: </h3>
                  <select name="selectedWeapon" value={displayedWeapon} onChange={updateSelectedWeapon}>
                    <option value='None Selected'>Select Your Weapon</option>
                    {weapons.map((weapon, i) => (
                      <option value={weapon.id} key={i}>
                        {weapon.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </label>
          </div>

          <div>
            <label>
              <h3>Armor Set:</h3>
              <select name="armorSet" onChange={updateSelectedArmor}>
                <option value="None Selected">Select an Armor Set</option>
                {armorSets.map((armorSet, i) => (
                  <option value={armorSet.id} key={i}>
                    {armorSet.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={createRowInSupabase}>
          Edit Hunter
        </button>
        <ToastContainer />
      </div>
    </div>
   );
}
 
export default EditHunter;