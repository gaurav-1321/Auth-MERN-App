import { toast } from "react-toastify";

export const handlesuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 2000,         // close after 2s
    hideProgressBar: false,  // show progress bar
    closeOnClick: true,      // close when clicked
    pauseOnHover: true,      // pause when hovered
    draggable: true,         // allow dragging
    theme: "colored",        // nice colored style
  });
};

export const handleerror = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,        
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
