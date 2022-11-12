
// IMPORT
import {useEffect} from 'react';
import {useStoreContext} from '../../utils/GlobalState';
import {SHUFFLE_AUTHORS} from '../../utils/actions';

import {joinAuthors} from '../../utils/helpers';


// COMPONENT
export default function Footer(){
    const [{siteAuthors}, dispatch] = useStoreContext();

    useEffect(
        () => {dispatch({type: SHUFFLE_AUTHORS})},
        []    
    );

    return (
        <footer>
            Designed and coded by {joinAuthors(siteAuthors)}
            <span></span> {/* UPDATE LATER: Add a border */}
            &copy;&nbsp;{new Date().getFullYear()}
        </footer>
    );
}