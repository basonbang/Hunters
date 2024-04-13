import EquipmentInput from './EquipmentInput';
import axios from 'axios';
import { supabase } from '../supabaseClient';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";

const EditHunter = () => {
  const isInitialMount = useRef(true);
  const [hunter, setHunter] = useState([]);
  const [hunterEquipment, setHunterEquipment] = useState({});

  const [name, setName] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState();
  const [displayedWeapon, setDisplayedWeapon] = useState('None Selected');
  const [armorId, setArmorId] = useState();

  const params = useParams();

  useEffect(() => {
    const getHunterDataFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("Hunters")
          .select()
          .eq("id", params.hunterId);
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
  }, [hunter]);

  const updateName = (event) => {
    setName(event.target.value);
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

  const updateSelectedArmor = (event) => {
    if (event.target.value === 'None Selected') {
      setArmorId(undefined);
    } else {
      setArmorId(event.target.value);
    }
  }

  console.log(params.hunterId);
  const editRowInSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("Hunters")
        .update([{ name: name, weaponId: selectedWeapon, armorId: armorId }])
        .eq("id", params.hunterId);
      successfulInsertToast();
    } catch (error) {
      console.log("Error inserting hunter: ", error.message);
      toast.error("Error Inserting hunter!",)
    }
  };

  const deleteRowInSupabase = async () => {
    try {
      const { data, error} = await supabase
        .from('Hunters')
        .delete()
        .eq('id', params.hunterId);
      successfulDeleteToast();
    } catch (error) {
      console.log('Error deleting hunter: ', error.message);
      toast.error('Error deleting hunter!');
    }
  }

  const successfulInsertToast = () =>
    toast.success("Hunter Updated!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const successfulDeleteToast = () =>
    toast.success("Hunter Deleted!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });


  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1>Edit Your Hunter</h1>
        <img
          src="/monster-hunter-world-review_ghem.1280 (1).png"
          alt="Create Hunter Banner"
          className="h-96 w-auto mt-10"
        />
      </div>
      <div>
        <h2>Current Hunter</h2>
        <h3>Name: {hunter[0]?.name}</h3>
        <h3>Weapon: {hunterEquipment?.weapon?.name}</h3>
        <h3>Armor: {hunterEquipment?.armor?.name}</h3>
      </div>
      {/* User Input */}
      <EquipmentInput
        name={name}
        updateName={updateName}
        displayedWeapon={displayedWeapon}
        selectedWeapon={selectedWeapon}
        updateSelectedWeapon={updateSelectedWeapon}
        updateSelectedArmor={updateSelectedArmor}
      />
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={editRowInSupabase}
        >
          Edit Hunter
        </button>
        <button
          className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"'
          onClick={deleteRowInSupabase}
        >
          Delete Hunter
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
 
export default EditHunter;