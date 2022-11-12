
// IMPORTS
import {useState, useEffect} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight} from '@fortawesome/free-solid-svg-icons';



// COMPONENT
export default function ResultsSelector({totalPages}){
    const sortOptions = ['Newest', 'Oldest'];
    const [sortOrder, setSortOrder] = useState(sortOptions[0]);

    const resultsPerPageOptions = [10, 25, 50];
    const [resultsPerPage, setResultsPerPage] = useState(resultsPerPageOptions[0]);

    const [pageNum, setPageNum] = useState(1);
    const [pageNumMidEdit, setPageNumMidEdit] = useState(1);

    useEffect(
        () => {
            console.log('re-query GraphQL');  // UPDATE LATER: Re-query GraphQL, update results on page
        },
        [pageNum, setPageNum, resultsPerPage, setResultsPerPage]
    );
    
    function handlePageNumBlur({target}){
        let val = Math.round(target.value) || 1;
        if (val > totalPages)
            val = totalPages;
        if (val < 1)
            val = 1;
        
        setPageNum(val);
        setPageNumMidEdit(val);
    }

    return <>
        <select
            className="filter-sort form-select form-select-sm"
            aria-label="filter sort"
            value={sortOrder}
            onChange={({target}) => setSortOrder(target.value)}
        >
            {sortOptions.map(option => 
                <option key={option}>
                    {option}
                </option>
            )}
        </select>

        <div className="page-selector">
            <label htmlFor="page-number" className="form-label">Page</label>

            <input
                id='page-number'
                className='form-control'
                type='number'
                value={pageNumMidEdit}
                onChange={({target}) => setPageNumMidEdit(target.value)}
                onBlur={handlePageNumBlur}
            />

            <label htmlFor="page-number" className="form-label">of {totalPages}</label>

            <div className="page-selector-arrows">
                <button
                    className={`first-page-selector ${pageNum > 1 ? 'visible' : 'invisible'}`}
                    onClick={() => {setPageNumMidEdit(1); setPageNum(1);}}
                >
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </button>

                <button
                    className={`prev-page-selector ${pageNum > 1 ? 'visible' : 'invisible'}`}
                    onClick={() => {setPageNumMidEdit(pageNum - 1); setPageNum(pageNum - 1);}}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                <button
                    className={`next-page-selector ${pageNum < totalPages ? 'visible' : 'invisible'}`}
                    onClick={() => {setPageNumMidEdit(pageNum + 1); setPageNum(pageNum + 1);}}
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>

                <button
                    className={`last-page-selector ${pageNum < totalPages ? 'visible' : 'invisible'}`}
                    onClick={() => {setPageNumMidEdit(totalPages); setPageNum(totalPages);}}
                >
                    <FontAwesomeIcon icon={faAnglesRight} />
                </button>
            </div>

            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {resultsPerPageOptions.map(option => 
                    <label
                        className={`btn btn-primary ${option === resultsPerPage ? 'active' : ''}`}
                        htmlFor={`${option}-option`}
                        key={`${option}-results-per-page`}
                    >
                        <input
                            className="d-none"
                            type='radio'
                            name={option}
                            id={`${option}-option`}
                            defaultChecked={option === resultsPerPageOptions[0]}
                            onClick={({target}) => setResultsPerPage(+target.getAttribute('name'))}
                        />
                        {option}
                    </label>    
                )}
            </div>
        </div>
    </>;
}