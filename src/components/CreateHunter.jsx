import { useState } from 'react';
import { supabase } from '../supabaseClient';

import EquipmentInput from "./EquipmentInput";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateHunter = () => {

  const [name, setName] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState();
  const [displayedWeapon, setDisplayedWeapon] = useState('None Selected');
  const [armorId, setArmorId] = useState();

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
        <h1>Create Your Hunter</h1>
        <img
          src="/1_Zy1vbnTdo-MMz-rqnrHzVQ-ai-brush-removebg-rsqseog.png"
          alt="Create Hunter Banner"
          className="h-96 w-auto mt-10"
        />
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
          onClick={createRowInSupabase}
        >
          Create Hunter
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
 
export default CreateHunter;