import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IoMdArrowDropdown,IoMdArrowDropup } from "react-icons/io";
import _ from 'lodash';

import { Pagination, Filter } from '../index'
import ChieldUserTable from './chieldTable'

let Users = (props) => {
    let [isDesplay, setIsDesplay] = useState(null);
    let [pageInfo, setPageInfo] = useState({ pageSize: 10, totalCount: 0, currentPage: 1, pagesCount: 0, pages: [], paginationList: [1, 2, 3, 4, 5, 6], isPrevious: "", isNext: "", pageSizeList: [ 10, 20, 30, 50,99], paginationType: "dropdown" }); // dropdown / list
    let [data, setData] = useState({ dataList: [], fromDataIndex: 0, toDataIndex: pageInfo.pageSize });
    let [filterInfo, setFilterInfo] = useState({ search: "", id: "", firstName: "", email: "", country: "allCountry" });
    let [chieldData, setChieldData] = useState({});
    let [sortData, setSortData] = useState({ sortField: "", sort: "" });

    let viewDetails = (index, item) => {
        if (isDesplay === index) {
            setIsDesplay(null);
            setChieldData({})
        } else {
            setIsDesplay(index);
            setChieldData(item)
        }
    };

    let getAllData = (fromDataIndex, toDataIndex) => {
        //here start server side paginatin with filter then get the data
        let countryList=["Bangladesh","India","Pakistan","Germany","Italy","France"]
        let dataList = [];
        
        for (let i = 1; i < 300; i++) {
            let obj={ }
             obj.id= i;
             obj.firstName= "Mohibur"+i;
             obj.lastName= "Rahmna"+i;
             obj.email= `mohib+${i}@gmail.com`;
             obj.country= _.sample(countryList);
             dataList.push(obj)  
        }
        //optional : there is client site filter

        var newData = dataList.filter((item) => {
            if (filterInfo.search !== "") {
                let isId = String(item.id).includes(String(filterInfo.search));
                let isFirstName = item.firstName.toLowerCase().includes(filterInfo.search.toLowerCase());
                let isEmail = item.email.toLowerCase().includes(filterInfo.search.toLowerCase());
                let isCountry = item.country.toLowerCase().includes(filterInfo.search.toLowerCase());
                //console.log("isFirstName", isFirstName, "isEmail", isEmail, "isCountry", isCountry);
                if (isId) {
                    return item
                } else if (isFirstName) {
                    return item
                } else if (isEmail) {
                    return item
                } else if (isCountry) {
                    return item
                }
            } else {
                return item
            }
        })

        let newDataList = newData.slice(fromDataIndex, toDataIndex)
        let responseData = { dataList: newDataList, totalCount: newData.length };
        return responseData;
    }

    const changeOrderBy = (result) => {
        console.log("changeOrderBy", result);
        let sortBy = ""
        let newData = []
        if (sortData.sortField === "" || (result === sortData.sortField && sortData.sort === "ascending" || (result !== sortData.sortField))) {
            var descendingOrder = _.sortBy(data.dataList, result).reverse();
            newData = descendingOrder;
            sortBy = "descending";
        }
        else if (result === sortData.sortField && sortData.sort === "descending") {
            var ascendingOrder = _.sortBy(data.dataList, result);
            newData = ascendingOrder;
            sortBy = "ascending";
        }
        setSortData({ sort: sortBy, sortField: result });
        setData({ ...data, dataList: newData });
    };

    useEffect(
        () => {
            let fromDataIndex = data.fromDataIndex;
            let toDataIndex = data.toDataIndex;
            let { totalCount } = getAllData(fromDataIndex, toDataIndex);
            setPageInfo({ ...pageInfo, totalCount });
        }, []
    );

    useEffect(
        () => {
            let fromDataIndex = pageInfo.currentPage === 1 ? 0 : (pageInfo.currentPage * pageInfo.pageSize) - pageInfo.pageSize;
            let toDataIndex = pageInfo.currentPage === 1 ? pageInfo.pageSize : pageInfo.currentPage * pageInfo.pageSize;
            let { dataList, totalCount } = getAllData(fromDataIndex, toDataIndex);
            setData({ dataList: dataList, fromDataIndex, toDataIndex })
            setPageInfo({ ...pageInfo, totalCount });
            setIsDesplay(null);
        }, [pageInfo.currentPage, pageInfo.pageSize, filterInfo.country, filterInfo.firstName, filterInfo.id, filterInfo.email, filterInfo.search]
    );

    return (
        <div className="row justify-content-center mt-5 ">
            <div className="col-12 col-md-12 col-xl-12 col-lg-12 col-sm-12 ">
                {/* after pagination bottom padding if need then remove pb-0 */}
                <div className="container custom_form mt-5 pb-0">
                    <div className="row mt-2 mb-1">
                        <div className="col-12 col-md-auto mr-auto float-md-left h4 text-center">
                            <div>
                                User Management
                            </div>
                        </div>
                        <div className="col-12 col-md-auto float-right">
                            <Filter filterInfo={filterInfo} setFilterInfo={setFilterInfo} pageInfo={pageInfo} setPageInfo={setPageInfo} />
                        </div>
                    </div>
                    <div className="row  mt-0 mb-0 mr-n4 ml-n4" >
                        <div className="col-12" >
                            {/* after pagination bottom mrgin if need mb-2 */}
                            <div className=" mt-2 ml-2 mr-2" >
                                {/* overflow-auto for horizontel over flow with  min_width_1000  in row*/}
                                <div className="container-fluid border overflow-auto" >
                                    <div className="row text-center font-weight-bold  border-bottom min_width_1000">
                                        <div className="col px-0 cursor_pointer" onClick={() => changeOrderBy("id")}>
                                            <div className="border-right">
                                                <div className="py-2 pl-3 pr-0">
                                                    ID
                                                     {sortData.sortField === "id" && sortData.sort ==="descending" ? <span><IoMdArrowDropup /></span>: <span ><IoMdArrowDropdown /></span> }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col px-0 cursor_pointer" onClick={() => changeOrderBy("firstName")}>
                                            <div className="border-right">
                                                <div className="py-2 pl-3 pr-0">
                                                    First Name
                                                    {sortData.sortField === "firstName" && sortData.sort ==="descending" ? <span ><IoMdArrowDropup /></span>: <span ><IoMdArrowDropdown /></span> }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col px-0 cursor_pointer" onClick={() => changeOrderBy("email")}>
                                            <div className="border-right">
                                                <div className="py-2 pl-3 pr-0">
                                                    Email
                                                    {sortData.sortField === "email" && sortData.sort ==="descending" ? <span ><IoMdArrowDropup /></span>: <span ><IoMdArrowDropdown /></span> }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col px-0 cursor_pointer" onClick={() => changeOrderBy("country")}>
                                            <div className="border-right">
                                                <div className="py-2 pl-3 pr-0">
                                                    Country
                                                    {sortData.sortField === "country" && sortData.sort ==="descending" ? <span ><IoMdArrowDropup /></span>: <span ><IoMdArrowDropdown /></span> }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col px-0" >
                                            <div className="">
                                                <div className="p-2">
                                                    Action
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        data.dataList.map((item, index) => {
                                            let borderClass = data.dataList.length - 1 !== index || index === isDesplay ? "border-bottom" : ""
                                            return (
                                                <div key={index} >
                                                    <div className={`row text-center  ${borderClass} min_width_1000`}>
                                                        <div className="col px-0">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col px-0">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.firstName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col px-0">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col px-0">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.country}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col px-0">
                                                            <div className="">
                                                                <div className="p-1">
                                                                    <button onClick={() => viewDetails(index, item)} type="button" className="btn btn-primary btn-sm">More Options</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        isDesplay === index &&
                                                        <ChieldUserTable data={chieldData} />
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Pagination pageInfo={pageInfo} setPageInfo={setPageInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
    //signinInfo: state.signin,
})

const mapDispatchToProps = dispatch => ({
    // handleSigninChange: (value) => dispatch(handleSigninChange(value)),
    // handleSigninSubmit: (value) => dispatch(handleSigninSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);