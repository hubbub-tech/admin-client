import { useState, useEffect } from 'react';

export const RecordPagination =  ({ currPage, pageMax, pageAmount }) => {


    const [prevPage, setPrevPage] = useState(currPage - 1);
    const [prevPageClassName, setPrevPageClassName] = useState("page-item");

    const [nextPage, setNextPage] = useState(currPage + 1);
    const [nextPageClassName, setNextPageClassName] = useState("page-item");

    useEffect(() => {

        setPrevPage(currPage - 1);
        setNextPage(currPage + 1);
        
        (prevPage === 0)
            ?   setPrevPageClassName("page-item disabled")
            :   setPrevPageClassName("page-item");

        (nextPage > pageMax)
            ?   setNextPageClassName("page-item disabled")
            :   setNextPageClassName("page-item");

    }, [currPage, pageAmount]);


    const getPages = () => {
        let pages = [];
        let pageNumber = 1;
        while (pageNumber <= pageMax) {
            let link = `/orders?page_number=${pageNumber}&page_amount=${pageAmount}`;
            let currPageClassName = (pageNumber === currPage) ? "page-item disabled" : "page-item";
            pages.push(
                <li className={currPageClassName} key={pageNumber}>
                    <a className="page-link" href={link}>
                        {pageNumber}
                    </a>
                </li>
            );
            pageNumber++;
        }
        return pages;
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={prevPageClassName}>
                    <a 
                        className="page-link" 
                        href={`/orders?page_number=${currPage - 1}&page_amount=${pageAmount}`}
                    >
                        Previous
                    </a>
                </li>
                {getPages()}
                <li className={nextPageClassName}>
                    <a 
                        className="page-link" 
                        href={`/orders?page_number=${currPage + 1}&page_amount=${pageAmount}`}
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}