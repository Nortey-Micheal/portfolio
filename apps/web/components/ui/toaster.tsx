import { ToastContainer, toast } from 'react-toastify';

const Toaster = () => {
  const notify = () => {
    toast('This is a toast message!');
  };

  return (
    <div>
      <button onClick={notify}>Show Toast</button>
      <ToastContainer />
    </div>
  );
};

export default Toaster;
