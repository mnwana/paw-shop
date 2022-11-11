
// IMPORT
import ListingInfo from '../../components/ListingInfo';


// COMPONENT
export default function Home(){
    return <>
        <ListingInfo
            name={'Test name'}
            category={'Test category'}
            username={'testusername'}
            dateCreated={'Aug 12, 2015 at 5:57 PM'}
            active={true}
        />
    </>;
}