import { Link, useParams } from "react-router-dom";

const HunterDetails = () => {

  const { hunterId } = useParams();
  const pathToEditPage = `/${hunterId}/edit`;

  return (
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
  );
}
 
export default HunterDetails;