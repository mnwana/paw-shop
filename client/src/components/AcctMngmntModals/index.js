
// IMPORTS
import AcctMngmntModal from './Single';

import {useStoreContext} from '../../utils/GlobalState';


// COMPONENT
export default function AcctMngmntModals(){
    const [{activePage}] = useStoreContext();

    if (activePage === 'My account')
        return <>
            <AcctMngmntModal type='update email' />
            <AcctMngmntModal type='update username' />
            <AcctMngmntModal type='update password' />
            <AcctMngmntModal type='delete account' />       
        </>;
    
    return <></>;
}