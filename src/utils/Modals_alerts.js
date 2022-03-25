import Swal from "sweetalert2";
import "@sweetalert2/theme-bulma";

export default {
    SwalMenssage: (msg, title)=>{
        Swal.fire(title, msg);
    },
    ToasMenssage: (msg)=>{
        Swal.fire({
            title: msg.trim(),
            toast: true,
            timerProgressBar: true,
            timer: 1500, 
            showConfirmButton: false,
            icon: "info",
            position: "top-end"
        });
    },
    ToasError: (msg)=>{
        Swal.fire({
            title: msg.trim(),
            toast: true,
            timerProgressBar: true,
            timer: 3000, 
            showConfirmButton: false,
            icon: "error",
            position: "top-end"});
    }
};