import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const handel = () => {
    toast.success("happy");
  };
  return (
    <div>
      <h1>Dashboard </h1>
      <ToastContainer />

      <button onClick={handel}>Click</button>
    </div>
  );
};

export default Dashboard;
