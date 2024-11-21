import { useState } from "react";
import { ChangePasswordUser } from "../../Service/userService";
import { toast } from 'react-toastify';



const ChangePass = () => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [error, setError] = useState('');
    const validatePassword = () => {
        if (!oldPass || !newPass || !confirmNewPass) {
            setError('Cả ba trường đều bắt buộc.');
            return false;
        }

        if (newPass === oldPass) {
            setError('Mật khẩu mới phải khác với mật khẩu cũ.');
            return false;
        }
        if (newPass !== confirmNewPass) {
            setError('Mật khẩu mới chưa trùng khớp.');
            return false;
        }

        if (newPass.length < 8) {
            setError('Mật khẩu mới phải dài ít nhất 8 ký tự.');
            return false;
        }
        if (confirmNewPass.length < 8) {
            setError('Mật khẩu mới phải dài ít nhất 8 ký tự.');
            return false;
        }


        setError('');
        return true;
    };
    const handleChangPass = async () => {
        if (validatePassword()) {
            let res = await ChangePasswordUser({
                oldPassword: oldPass,
                newPassword: newPass
            })
            if (res && res.code === 201) {
                toast.success(res.message);
                setOldPass('');
                setNewPass('');
                setConfirmNewPass('')
            }
            if (res && res.code !== 201) {
                toast.error(res.message);
            }

        }


    }
    return (
        <div>
            <div className="mb-3 pt-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Mật khẩu: </label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    value={oldPass}
                    onChange={(event) => setOldPass(event.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu mới:</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    value={newPass}
                    onChange={(event) => setNewPass(event.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Xác nhận mật khẩu mới:</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    value={confirmNewPass}
                    onChange={(event) => setConfirmNewPass(event.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="btn btn-primary" onClick={() => handleChangPass()}>Gửi</button>
        </div>
    )
}

export default ChangePass;