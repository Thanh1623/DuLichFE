import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReactDOM from 'react-dom';

const TableEventAdmin = (props) => {

    const { listEvents, pageCount, search } = props;

    const handlePageClick = (event) => {
        if (!search) {
            props.fetchListEventsWithPaginate(+event.selected + 1)
            props.setCurrentPage(+event.selected + 1);
        }
        if (search) {
            props.handleSearchEvent(+event.selected + 1);
            props.setCurrentPage(+event.selected + 1);
        }
        // props.fetchListEventsWithPaginate(+event.selected + 1)
        // props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    // Chuyển đổi dấu thời gian thành định dạng ngày
    const convertToDate = (isoTimestamp) => {
        let date = new Date(isoTimestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${year}-${month}-${dt}`;
    };

    return (
        <>
            <table className="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Start time</th>
                        <th scope="col">End time</th>
                        <th scope="col">Address</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listEvents && listEvents.length > 0
                            ?
                            listEvents.map((item, index) => {
                                return (
                                    <tr key={`table-events-${index}`}>
                                        <td>{item.event_id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.opening_hours_event}</td>
                                        <td>{item.closing_time_event}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <img src={`data:image/jpeg;base64,${item.eventimg_url}`} class="rounded mx-auto d-block" style={{ maxWidth: '200px' }} alt="..."></img>
                                        </td>
                                        <td>
                                            <button className="btn btn-info mx-1 my-1"
                                                onClick={() => props.handleClickBtnView(item)}
                                            >View</button>
                                            <button className="btn btn-success mx-1 my-1"
                                                onClick={() => props.handleClickBtnUpdate(item)}
                                            >Update</button>
                                            <button className="btn btn-danger mx-1 my-1"
                                                onClick={() => props.handleClickBtnDelete(item)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan="7">Not found data</td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableEventAdmin;