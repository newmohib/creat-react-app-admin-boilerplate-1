import React, { useEffect } from 'react';

import _ from 'lodash';

function Filter(props) {

    let CountryLit = [
        { id: 1, country: "Bangladesh" },
        { id: 2, country: "India" },
        { id: 3, country: "Pakistan" },
        { id: 4, country: "Germany" },
        { id: 5, country: "Italy" },
        { id: 6, country: "France" },
    ];

    let onChangeValue = (item) => {
        // sort Number
        // filterInfo.sort((a,b)=> a.id -b.id);
        let { name, value } = item;
        let { pageInfo, filterInfo } = props;
        console.log(name, ":", value);
        props.setFilterInfo({ ...filterInfo, [name]: value });
        props.setPageInfo({ ...pageInfo, currentPage: 1 });
    }


    return (

        <div className="">
            <input style={{height:"30px"}} placeholder="Search" id="search" name="search" type="text" className="form-control rounded-pill" onChange={({ currentTarget: input }) => onChangeValue({ name: input.name, value: input.value })} />
        </div>
    );
}

export default Filter;