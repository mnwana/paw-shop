
// IMPORT

const shuffle = require('lodash.shuffle');

import {joinAuthors} from '../../utils/helpers';


// COMPONENT
export default function Footer(){
    const siteAuthors = shuffle([
        {
            name: 'Noah Becker',
            link: 'https://noah35becker.github.io/portfolio/'
        },
        {
            name: 'Michael Choi',
            link: 'https://github.com/jchoi10?tab=repositories'
        },
        {
            name: 'Marielle Nwana',
            link: 'https://www.mariellenwana.com'
        },
        {
            name: 'Claudia Yile',
            link: 'https://market.zora.co/cybele'
        }
    ]);

    return (
        <footer className='text-center flex-grow-0 mt-3 mb-1'>
            Designed and coded by {joinAuthors(siteAuthors)}
            &ensp;<span className='border border-start border-dark border-0'></span>
            &ensp;&copy;&nbsp;{new Date().getFullYear()}
        </footer>
    );
}