import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-16 pt-16">
      <div className="flex md:flex-row items-center justify-center md:items-start gap-6 p-6">
        <h1 className="text-5xl font-semibold ">Unleash Your Best Hunt</h1>
        <div className="flex flex-col items-center gap-2 text-sm">
          <h2 className="text-base text-center">Ready to dominate? Choose your perfect build and become the ultimate monster hunter! Click here to select your build and start your legendary hunt today!</h2>
          <button className="px-4 py-3 bg-blue-500 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-110">
            <Link to='/create'>Create!</Link>
          </button>
        </div>
      </div>
      <div className="row-span-1">
        <img src="/cj97pz5etjy21.webp" alt="Hero card banner" className="w-full h-auto rounded-lg max-h-min" />
      </div>
    </div>
  );
}

 
export default Home;