
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
            &ensp;<span className='border border-start border-dark border-0'></span>
            &ensp;&copy;&nbsp;{new Date().getFullYear()}
        </footer>
    );
}