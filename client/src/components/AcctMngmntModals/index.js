
// IMPORTS
import AcctMngmntModal from './Single';

import {useStoreContext} from '../../utils/GlobalState';

export const AcctMngmntModalTypes = [
    'update email',
    'update username',
    'update borough',
    'update password',
    'delete account'
];

// COMPONENT
export default function AcctMngmntModals(){
    const [{activePage}] = useStoreContext();

    if (activePage === 'My account')
        return <>
            {AcctMngmntModalTypes.map(type => 
                <AcctMngmntModal type={type} key={type} />
            )} 
        </>;
    
    return <></>;
}