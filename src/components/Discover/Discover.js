import bistro from '../../assets/bistro.jpg'
import './Discover.scss'

const Discover = () => {
    return (
        <div className="discover-container container">
            <div className="header-discover">
                <div>Trang chủ</div>
                <div>Kết quả</div>
            </div>
            <div className="content-discover">
                <div className="content-left col-12 col-sm-2">
                    <div className="area">
                        <div className="title">
                            Khu vực
                        </div>
                        <div className="content-area">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="location">
                        <div className="title-location">
                            Loại địa điểm
                        </div>
                        <div className="content-location">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="type">
                        <div className="title-location">
                            Loại hình du lịch
                        </div>
                        <div className="content-location">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="FeeType">
                        <div className="title-location">
                            Loại phí
                        </div>
                        <div className="content-location">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Default checkbox
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label class="form-check-label" for="flexCheckChecked">
                                    Checked checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-right col-12 col-sm-10">
                    <div className="option">
                        <div className="image">
                            <img src={bistro} />
                        </div>
                        <div className='option-content'>
                            <div className='option-title'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-location'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-time'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-fee'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-price'>
                                Maple cafe & bistro
                            </div>
                        </div>
                    </div>
                    <div className="option">
                        <div className="image">
                            <img src={bistro} />
                        </div>
                        <div className='option-content'>
                            <div className='option-title'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-location'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-time'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-fee'>
                                Maple cafe & bistro
                            </div>
                            <div className='option-price'>
                                Maple cafe & bistro
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discover;