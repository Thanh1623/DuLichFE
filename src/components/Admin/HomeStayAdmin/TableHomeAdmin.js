import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableHomeStayAdmin = (props) => {

    const { listFoods, pageCount } = props;

    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };


    return (
        <>
            <table className="table table-hover table-bordered table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listFoods && listFoods.length > 0
                            ?
                            listFoods.map((item, index) => {
                                return (
                                    <tr key={`table-events-${index}`}>
                                        <td>{item.cuisines_id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn btn-info">View</button>
                                            <button className="btn btn-success mx-1"
                                                onClick={() => props.handleClickBtnUpdate(item)}
                                            >Update</button>
                                            <button className="btn btn-danger"
                                                onClick={() => props.handleClickBtnDelete(item)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan="5">Not found data</td>
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

export default TableHomeStayAdmin;