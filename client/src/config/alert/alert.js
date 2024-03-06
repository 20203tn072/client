import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AlertClient = withReactContent(Swal);

//Titulos y Mensjaes definidos succes | error | confirm
//alert error
//alert succes
//alert confirm

export const customAlert = (title, text, icon) => {
    return AlertClient.fire({
        title,
        text,
        icon,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
    });
}