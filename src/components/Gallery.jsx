import { supabase } from "../supabaseClient";
import {useState, useEffect} from 'react';
import HunterCard from "./HunterCard";

const Gallery = () => {

  const [hunters, setHunters] = useState([]);

  // Read all hunters from Supabase as soon as the component mounts 
  useEffect(() => {
    const fetchHunters = async () => {
      try {
        const { data, error } = await supabase
          .from('Hunters')
          .select();
        setHunters(data);
      } catch (error) {
        console.log('Error: ', error);
      }
    }

    fetchHunters();
  }, []);
  

  return (
    <div className="container mx-auto px-4">
      <div>
        <h1 className="text-2xl font-bold text-center my-16">Your Hunter Gallery</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hunters.map((hunter) => (
          <HunterCard key={hunter.id} hunter={hunter} />
        ))}
      </div>
    </div>
  );
}
 
export default Gallery;