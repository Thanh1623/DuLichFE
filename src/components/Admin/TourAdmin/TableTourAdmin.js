import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableTourAdmin = (props) => {

    const { listTours, pageCount, search } = props;

    const handlePageClick = (event) => {

        if (!search) {
            props.fetchListToursWithPaginate(+event.selected + 1)
            props.setCurrentPage(+event.selected + 1);
        }
        if (search) {
            props.handleSearchTour(+event.selected + 1);
            props.setCurrentPage(+event.selected + 1);
        }

        // props.fetchListToursWithPaginate(+event.selected + 1)
        // props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    function formatNumberWithDots(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <>
            <table className="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Start day</th>
                        <th scope="col">Address</th>
                        <th scope="col">Vehicle</th>
                        <th scope="col">Members</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listTours && listTours.length > 0
                            ?
                            listTours.map((item, index) => {
                                return (
                                    <tr key={`table-events-${index}`}>
                                        <td>{item.tour_id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.tour_date}</td>
                                        <td>{item.address}</td>
                                        <td>{item.vehicle}</td>
                                        <td>{item.members}</td>
                                        <td>{formatNumberWithDots(`${item.price}`)} VND</td>
                                        <td>
                                            <img src={`data:image/jpeg;base64,${item.tour_image_base64}`} class="rounded mx-auto d-block" style={{ maxWidth: '200px' }} alt="..."></img>
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
                                <td colSpan="9">Not found data</td>
                            </tr>
                    }
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
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

export default TableTourAdmin;