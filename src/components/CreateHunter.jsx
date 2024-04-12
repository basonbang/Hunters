import { useState, useEffect, useRef } from "react";
import axios from 'axios';

const CreateHunter = () => {

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
  }

  console.log(weapons);

  return ( 
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1>Create Your Hunter</h1>
        <img src="/1_Zy1vbnTdo-MMz-rqnrHzVQ-ai-brush-removebg-rsqseog.png" alt="Create Hunter Banner" className='h-96 w-auto mt-10'/>
      </div>
      <div>
        <div className="flex items-center justify-center gap-4">
          <div>
            <label>
              <h3>Name:</h3>
              <input type="text" name="name" id="name" placeholder="Enter your hunter's name!" />
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
            </label>

            {(weaponType !== 'None Selected' && weaponType) && (
              <label>
                <h3> Weapon: </h3>
                <select name="selectedWeapon">
                  <option value='None Selected'>Select Your Weapon</option>
                  {weapons.map((weapon, i) => (
                    <option value={weapon} key={i}>
                      {weapon.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

          </div>

        </div>
      </div>
    </div>
   );
}
 
export default CreateHunter;