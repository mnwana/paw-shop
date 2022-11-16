
// IMPORTS
import {useState, useEffect} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight} from '@fortawesome/free-solid-svg-icons';

import './index.css';


// COMPONENT
export default function ResultsSelector({totalPages, name}){
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
        [sortOrder, setSortOrder, pageNum, setPageNum, resultsPerPage, setResultsPerPage]
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

    return <div className='results-selector d-flex justify-content-end align-items-center mt-3 mb-5'>
        <div className="filter-sort-wrapper form-floating mx-3">
            <select
                className="filter-sort form-select form-select-sm"
                id={`${name}-filter-sort`}
                aria-label="filter sort"
                value={sortOrder}
                onChange={({target}) => {setSortOrder(target.value); setPageNumMidEdit(1); setPageNum(1);}}
            >
                {sortOptions.map(option => 
                    <option key={option}>
                        {option}
                    </option>
                )}
            </select>
            <label htmlFor={`${name}-filter-sort`}>Sort by</label>
        </div>

        <div className="page-number-selector-wrapper d-flex flex-column mx-3">
            <div className="page-number-wrapper d-flex align-items-center justify-content-center">
                <label htmlFor={`${name}-page-number`} className="form-label mb-0">Page</label>

                <input
                    id={`${name}-page-number`}
                    className='page-number form-control mx-1 py-0 px-0'
                    type='number'
                    value={pageNumMidEdit}
                    onChange={({target}) => setPageNumMidEdit(target.value)}
                    onBlur={handlePageNumBlur}
                />

                <label htmlFor={`${name}-page-number`} className="form-label mb-0">of {totalPages}</label>
            </div>

            <div className="page-number-arrows-wrapper text-center">
                <button
                    className={`first-page-selector ${pageNum > 1 ? 'visible' : 'invisible'} btn btn-sm hover-opacity`}
                    onClick={() => {
                        setPageNumMidEdit(1);
                        setPageNum(1);
                    }}
                >
                    <FontAwesomeIcon icon={faAnglesLeft} />
                </button>

                <button
                    className={`prev-page-selector ${pageNum > 1 ? 'visible' : 'invisible'} btn btn-sm hover-opacity`}
                    onClick={() => {
                        if(pageNum > 1){
                            setPageNumMidEdit(pageNum - 1);
                            setPageNum(pageNum - 1);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                <button
                    className={`next-page-selector ${pageNum < totalPages ? 'visible' : 'invisible'} btn btn-sm hover-opacity`}
                    onClick={() => {
                        if(pageNum < totalPages){
                            setPageNumMidEdit(pageNum + 1);
                            setPageNum(pageNum + 1);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>

                <button
                    className={`last-page-selector ${pageNum < totalPages ? 'visible' : 'invisible'} btn btn-sm hover-opacity`}
                    onClick={() => {
                        setPageNumMidEdit(totalPages);
                        setPageNum(totalPages);
                    }}
                >
                    <FontAwesomeIcon icon={faAnglesRight} />
                </button>
            </div>
        </div>

        <div className="results-per-page-wrapper d-flex flex-column justify-content-center align-items-center mx-3">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {resultsPerPageOptions.map(option => 
                    <label
                        className={`btn btn-primary ${option === resultsPerPage ? 'active' : ''}`}
                        htmlFor={`${name}-${option}-option`}
                        key={`${option}-results-per-page`}
                    >
                        <input
                            className="d-none"
                            type='radio'
                            name={option}
                            id={`${name}-${option}-option`}
                            defaultChecked={option === resultsPerPageOptions[0]}
                            onClick={({target}) => {setResultsPerPage(+target.getAttribute('name')); setPageNumMidEdit(1); setPageNum(1);}}
                        />
                        {option}
                    </label>
                )}
            </div>
            <p className="results-per-page mb-0">results per page</p>
        </div>
    </div>;
}