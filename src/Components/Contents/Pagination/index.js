import React, { useEffect } from 'react';
import _ from 'lodash';

function Pagination(props) {
    //pagination dropdown finlly completed with List pagination

    useEffect(
        () => {
            let { pageInfo } = props;
            let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
            let allPages = createPageList(pageInfo.currentPage, pagesCount);
            let isPrevious = Number(pageInfo.currentPage) == 1 ? "disabled" : "";
            let isNext = Number(pageInfo.currentPage) == pagesCount ? "disabled" : "";
            let { pages } = getPager(pageInfo.totalCount, pageInfo.currentPage, pageInfo.pageSize, pageInfo.paginationList);

            let paginationPages = pageInfo.paginationType === "dropdown" ? allPages : pages;
            props.setPageInfo({ ...pageInfo, pagesCount, pages: paginationPages, isPrevious, isNext });
        }, [props.pageInfo.totalCount]
    );


    const getPager = (totalItems, currentPage, pageSize, paginationList) => {
        console.log("currentPage", currentPage);
        let middleCeilIndex = Math.ceil(paginationList.length / 2);
        let middleFloorIndex = Math.floor(paginationList.length / 2);
        let remainingMeddleIndex = paginationList.length - middleCeilIndex;
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;
        var totalPages = Math.ceil(totalItems / pageSize);
        var startPage, endPage;
        if (totalPages <= paginationList.length) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= middleCeilIndex) {
                startPage = 1;
                endPage = paginationList.length;
            } else if (Number(currentPage) + Number(remainingMeddleIndex) <= totalPages) {
                startPage = currentPage - remainingMeddleIndex;
                endPage = Number(currentPage) + Number(remainingMeddleIndex) - 1;
            } else if (Number(currentPage) + Number(remainingMeddleIndex) > totalPages && currentPage <= totalPages) {
                let remaining = totalPages - currentPage;
                startPage = Number(currentPage - middleFloorIndex) + Number(remaining) - 1;
                endPage = totalPages;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = startIndex + pageSize;
        var pages = _.range(startPage, endPage + 1);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    const createPageList = (currentPage, pageCount) => {
        let total = 50;
        currentPage = Number(currentPage);
        pageCount = Number(pageCount);

        let incrementTo = currentPage + total >= pageCount ? pageCount : currentPage + total;
        let increment = _.range(currentPage + 1, incrementTo + 1);
        let decrementTo = total > increment[0] ? increment[0] - 1 : pageCount <= total ? pageCount : total;
        let decrement = _.range(currentPage - decrementTo + 1, currentPage + 1);

        let incrementDecrement = [...decrement, ...increment];
        let lastElemnet = incrementDecrement.slice(-1)[0];
        let newIncrementDecrement = [];

        if (decrement.length < increment.length && lastElemnet <= pageCount && (total * 2) <= pageCount) {
            let remainingIncrementTotal = (total * 2) - incrementDecrement.length;
            let remainingIncrement = _.range(lastElemnet + 1, incrementDecrement.length + remainingIncrementTotal + 1);
            newIncrementDecrement = [...incrementDecrement, ...remainingIncrement];
        }
        else if (decrement.length === increment.length && lastElemnet <= pageCount && (total * 2) <= pageCount) {
            newIncrementDecrement = [...incrementDecrement];
        }
        else if (decrement.length > increment.length && increment.length < total && (total * 2) <= pageCount) {
            let remainingDecrementTotal = total - increment.length;
            let remainingDecrement = _.range(currentPage - remainingDecrementTotal - total, currentPage);
            newIncrementDecrement = [...remainingDecrement, ...increment];
        }
        else {
            newIncrementDecrement = [...incrementDecrement];
        }
        return newIncrementDecrement
    }

    const pageChange = (newCurrentPage) => {

        let { pageInfo } = props
        let { currentPage, totalPages, pages } = getPager(pageInfo.totalCount, newCurrentPage, pageInfo.pageSize, pageInfo.paginationList);
        currentPage = Number(currentPage)
        let allPages = createPageList(newCurrentPage, pageInfo.pagesCount);
        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === totalPages ? "disabled" : "";
        let paginationPages = pageInfo.paginationType === "dropdown" ? allPages : pages;
        props.setPageInfo({ ...pageInfo, pagesCount: totalPages, pages: paginationPages, isPrevious, isNext, currentPage });
    }

    const pageSizeChange = ({ currentTarget: input }) => {
        let { pageInfo } = props
        let newPageSize = input.value;
        let { currentPage, pageSize, totalPages, pages } = getPager(pageInfo.totalCount, pageInfo.currentPage, newPageSize, pageInfo.paginationList);
        currentPage = currentPage > totalPages ? totalPages : currentPage;
        let allPages = _.range(1, totalPages + 1);
        let paginationPages = pageInfo.paginationType === "dropdown" ? allPages : pages;
        props.setPageInfo({ ...pageInfo, pagesCount: totalPages, pages: paginationPages, currentPage, pageSize });
    }

    return (

        <div className="container-fluid mt-2">
            <div className="row" >
                <div className="col px-0 mb-2 mr-1 order-1 order-md-0">
                    <div>
                        <button disabled={props.pageInfo.isPrevious} style={{ backgroundColor: "#F0EFEF", color: "black", border: "none" }} onClick={() => pageChange(props.pageInfo.currentPage - 1)} className={`btn btn-light btn-block btn-lg`}><span>Previous</span></button>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-auto mr-auto ml-auto my-auto order-0 px-md-0">
                    <div className="container-fluid px-0">
                        <div className="row text-center ml-n4 mr-n4 ml-md-1 mr-md-1 ">
                            <div className="col-4 col-sm-4 col-md-5 pl-2">
                                <select
                                    className="form-control mb-2 px-1"
                                    onChange={pageSizeChange} >

                                    {props.pageInfo.pageSizeList.map((item, index) => {
                                        let newItem = item < 10 ? `0${item} rows` : `${item} rows`;
                                        return (
                                            <option
                                                key={index + 40}
                                                value={item}
                                            >{newItem}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-2 col-sm-2 col-md-1 mt-2 ">
                                <span className="mb-3 mr-n5 mr-md-1">Page</span>
                            </div>
                            <div className="col-4 col-sm-4 col-md-auto  ml-md-3  pl-3 pr-2 mr-md-2 ">
                                <select
                                    value={props.pageInfo.currentPage}
                                    className="form-control mb-2 "
                                    onChange={({ currentTarget }) => pageChange(currentTarget.value)} >
                                    {props.pageInfo.pages.map((item, index) => {
                                        let newItem = item < 10 ? `0${item}` : `${item}`;
                                        return (
                                            <option
                                                key={index + 50}
                                                value={item}
                                            >{newItem}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-2 col-sm-2 col-md-auto  pr-0 mt-2 ml-n4 ">
                                <span className="mb-3 ">of {props.pageInfo.pagesCount < 10000 ? props.pageInfo.pagesCount : 9999 + '+'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col px-0 order-2 order-md-last mb-2 ml-1">
                    <button disabled={props.pageInfo.isNext} style={{ backgroundColor: "#F0EFEF", color: "black", border: "none" }} onClick={() => pageChange(props.pageInfo.currentPage + 1)} className={`btn btn-light btn-block btn-lg`}><span>Next</span></button>
                </div>
            </div>
        </div>
    );
}

export default Pagination;