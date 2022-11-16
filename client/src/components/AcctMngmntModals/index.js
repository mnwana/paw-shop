
// IMPORTS
import AcctMngmntModal from './Single';


// ACCOUNT MANAGEMENT MODAL TYPES
export const AcctMngmntModalTypes = [
    'update email',
    'update username',
    'update borough',
    'update password',
    'delete account'
];


// COMPONENT
export default function AcctMngmntModals(){
    return <>
        {AcctMngmntModalTypes.map(type => 
            <AcctMngmntModal type={type} key={type} />
        )} 
    </>;
}