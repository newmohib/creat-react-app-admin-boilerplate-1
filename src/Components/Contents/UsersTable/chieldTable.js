
import React from 'react';



let ChieldUserTable = (props) => {
    console.log("data", props.data);
    let { data } = props
    return (
        <div className='row  bg-light ' >
            <div className="col bg-light px-0">
                <div className="container-fluid min_width_1000   bg-light ">
                    <div className="row ">
                        <div className="col pt-2">
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="pills-view-tab" data-toggle="pill" href="#pills-view" role="tab" aria-controls="pills-view" aria-selected="true">View</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-update-tab" data-toggle="pill" href="#pills-update" role="tab" aria-controls="pills-update" aria-selected="false">Update</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-delete-tab" data-toggle="pill" href="#pills-delete" role="tab" aria-controls="pills-delete" aria-selected="false">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-view" role="tabpanel" aria-labelledby="pills-view-tab">
                        <div className="container-fluid min_width_1000 border-bottom   bg-light">

                            <div className="row info-table__tr ">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4 font-weight-bold">
                                            <label htmlFor="">First Name</label>
                                        </div>
                                        <div className="col-8">
                                            <div className="table_value_pre">{data.firstName}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4 font-weight-bold">
                                            <label htmlFor="">Last Name</label>
                                        </div>
                                        <div className="col-8">
                                            <div className="table_value_pre">{data.lastName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row info-table__tr ">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4 font-weight-bold">
                                            <label htmlFor="">Email</label>
                                        </div>
                                        <div className="col-8">
                                            <div className="table_value_pre">{data.email}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4 font-weight-bold">
                                            <label htmlFor="">Country</label>
                                        </div>
                                        <div className="col-8">
                                            <div className="table_value_pre">{data.country}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-update" role="tabpanel" aria-labelledby="pills-update-tab">
                        <div className="container-fluid pb-2  min_width_1000 border-bottom   bg-light">
                            <div className="row">
                                <div className="col text-center">
                                    Update
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-delete" role="tabpanel" aria-labelledby="pills-delete-tab">
                        <div className="container-fluid pb-2 min_width_1000 border-bottom   bg-light">
                            <div className="row">
                                <div className="col text-center">
                                    Delete
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChieldUserTable;