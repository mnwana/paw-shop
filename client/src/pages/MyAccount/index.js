
// IMPORTS
import PostInfo from '../../components/PostInfo';
import ResultsSelector from '../../components/ResultsSelector';

import {kebabify, capitalize} from '../../utils/helpers';

import AcctMngmntModals from '../../components/AcctMngmntModals';
import {AcctMngmntModalTypes} from '../../components/AcctMngmntModals';

import './index.css';



// COMPONENT
export default function MyAccount(){
    return <>
        <AcctMngmntModals />
    
        <div className='my-account-wrapper w-100 mt-2'>
            <h2 className='welcome-user user-header text-center'>
                Welcome, username <span className='fst-italic fs-3'>(Current Borough)</span> {/* UPDATE LATER to pull username and borough from query */}
            </h2>

            <div className="acct-mngmnt-btns-wrapper d-flex flex-wrap justify-content-center my-4">
                {AcctMngmntModalTypes.map(type => 
                    <button
                        className='btn mx-2 mb-2 hover-opacity'
                        data-bs-toggle="modal"
                        data-bs-target={`#${kebabify(type)}-modal`}
                        key={type}
                    >
                        {capitalize(type)}
                    </button>    
                )}
            </div>

            <div className="your-posts mx-3">
                <h3 className='posts-section-title text-center'>Your posts</h3>

                <h4 className='text-center'>Active</h4>
                <div className='your-active-posts-wrapper posts-wrapper d-flex flex-column align-items-center mb-2'>
                    {/* Sample post info */}
                    <PostInfo
                        postId={123456}
                        title={'Test active title'}
                        dateCreated={'Sep 8, 2021 at 7:40 AM'}
                        watchCount={1}
                        toggleBtn={true}
                        active={true}
                        showDeleteBtn={true}
                    />

                    <PostInfo
                        postId={123456}
                        title={'Another test active title'}
                        dateCreated={'Oct 8, 2021 at 7:49 AM'}
                        watchCount={3}
                        toggleBtn={true}
                        active={true}
                        showDeleteBtn={true}
                    />


                    <ResultsSelector totalPages={4} name={'your-active-posts'} />  {/* UPDATE LATER */}
                </div>
                
                <h4 className='text-center fst-italic'>Inactive</h4>
                <div className='your-inactive-posts-wrapper posts-wrapper d-flex flex-column align-items-center mb-2'>
                    {/* Sample post info */}
                    <PostInfo
                        postId={123456990}
                        title={'Test inactive title'}
                        dateCreated={'Jan 12, 2020 at 7:19 PM'}
                        watchCount={0}
                        toggleBtn={true}
                        active={false}
                        showDeleteBtn={true}
                    />

                    <ResultsSelector totalPages={1} name={'your-inactive-posts'} />  {/* UPDATE LATER */}
                </div>
            </div>

            <div className="watched-items mt-5 mb-4 mx-3">
                <h3 className='posts-section-title text-center'>Items you're watching</h3>

                <h4 className='text-center'>Active</h4>
                <div className="active-watched-items-wrapper posts-wrapper d-flex flex-column align-items-center mb-2">

                    {/* Sample post info */}
                    <PostInfo
                        postId={87213}
                        title={'Test watching active title'}
                        watchCount={4}
                        username={'testUsername'}
                        borough={'staten island'}
                        dateCreated={'Oct 1, 2019 at 4:08 PM'}
                        active={true}
                    />

                    <ResultsSelector totalPages={2} name={'watched-active-posts'} />  {/* UPDATE LATER */}
                </div>

                <h4 className='text-center fst-italic'>Inactive</h4>
                <div className="inactive-watched-items posts-wrapper d-flex flex-column align-items-center mb-2">

                    {/* Sample post info */}
                    <PostInfo
                        postId={45790}
                        title={'Test watching inactive title'}
                        watchCount={39}
                        active={false}
                    />

                    <ResultsSelector totalPages={6} name={'watched-inactive-posts'} />  {/* UPDATE LATER */}
                </div>
            </div>
        </div>
    </>;
}