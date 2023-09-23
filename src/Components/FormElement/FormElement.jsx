import "./FormElement.scss";

import { useState } from 'react';

import { ReactComponent as LeftArrow } from "../../Constants/Svg/LeftArrow.svg"
import { ReactComponent as Email } from "../../Constants/Svg/Email.svg"
import { ReactComponent as File } from "../../Constants/Svg/File.svg"

import Swal from 'sweetalert2'



const FormElement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [entriesCount, setEntriesCount] = useState(1)


    const handleNameChange = (e) => {
        setName(e.target.value);
        checkButtonEnabled();
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        checkButtonEnabled();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        checkButtonEnabled();

        const reader = new FileReader();
        reader.onload = function (event) {
            const fileContent = event.target.result;
            setFileContent(fileContent);
        };
        reader.readAsText(selectedFile);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEntriesCount(entriesCount + 1)
        Swal.fire({
            title: 'Success',
            text: `${entriesCount} entries successfully submitted`,
            icon: 'success',
            confirmButtonText: 'Go to My Entries',
            iconColor: "blue",
            cancelButtonText: "Cancel",
            cancelButtonColor: "rgba(48, 98, 200, 0.5)",
            showCancelButton: true,
            focusCancel: true

        })
        setName("")
        setEmail("")
        setFile(null)
        setFileContent("")
        setIsButtonEnabled(false)

    };

    const checkButtonEnabled = () => {
        if (name.length > 2 && email && file) {
            setIsButtonEnabled(true);
        } else {
            setIsButtonEnabled(false);
        }
    };

    return (
        <div className='myform-section'>
            <div className='header'>
                <span><LeftArrow /></span><span className="submit-text">Submit Form</span>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label className="label">Full Name</label>
                    <input type="text" value={name} onChange={handleNameChange} placeholder="Full Name" className="input-feild" />
                </div>

                <div className="form-group">
                    <label className="label">Email</label>
                    <span>
                        <span className="email-icon"><Email /></span>
                        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" className="input-feild" />
                    </span>
                </div>

                <div className="form-group">
                    <label className="label">Upload JSON File</label>
                    <div className="file-section">
                        <label className="file-label">
                            <input type="file" accept=".json" onChange={handleFileChange} className="input-feild" />
                            <div><File /></div>
                            <div className="browse-text">Browse File</div>
                        </label>
                    </div>


                    <div className="file-contents">
                        <label className="file-contents-label">File Contents:</label>
                        <textarea
                            value={fileContent}
                            rows="8"
                            readOnly
                            className="textarea"
                        ></textarea>
                    </div>

                </div>

                <div className="submit-btn-section">
                    <button type="submit" disabled={!isButtonEnabled} className={`submit-btn ${isButtonEnabled ? "selected" : ""} `}>
                        Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default FormElement;
