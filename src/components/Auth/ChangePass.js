import { useState } from "react";
import { ChangePasswordUser } from "../../Service/userService";
import { toast } from 'react-toastify';



const ChangePass = () => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState('');
    const validatePassword = () => {
        if (!oldPass || !newPass) {
            setError('Both fields are required.');
            return false;
        }

        if (newPass === oldPass) {
            setError('New password must be different from the old password.');
            return false;
        }

        if (newPass.length < 8) {
            setError('New password must be at least 8 characters long.');
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
            if (res && res.code === 200) {
                toast.success(res.message);
                setOldPass('');
                setNewPass('');
            }
            if (res && res.code !== 200) {
                toast.error(res.message);
            }

        }


    }
    return (
        <div>
            <div className="mb-3 pt-4">
                <label htmlFor="exampleInputEmail1" className="form-label">Password: </label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    value={oldPass}
                    onChange={(event) => setOldPass(event.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">New password:</label>
                <input type="text" className="form-control" id="exampleInputPassword1"
                    value={newPass}
                    onChange={(event) => setNewPass(event.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="btn btn-primary" onClick={() => handleChangPass()}>Submit</button>
        </div>
    )
}

export default ChangePass;