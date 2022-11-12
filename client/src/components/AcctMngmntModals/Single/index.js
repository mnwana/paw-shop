
// IMPORT
import $ from 'jquery';
import {useState} from 'react';
import {kebabify, capitalize} from '../../../utils/helpers';




// COMPONENT
export default function AcctMngmntModal({type}){
    let updateFieldName;
    switch (type){
        case 'update email':
            updateFieldName = 'email';
            break;
        case 'update username':
            updateFieldName = 'username';
            break;
        case 'update password':
            updateFieldName = 'password';
            break;
    }


    const [formData, setFormData] = useState({
        updateField: '',
        password: ''
    });


    function handleFormChange({target}){
        const updatedFormData = {...formData};

        updatedFormData[target.name] = target.value;

        setFormData(updatedFormData);
    }    

    
    function handleFormSubmit(e){  // UPDATE LATER
        e.preventDefault();

        alert(`Type: ${type}
            Payload:
                ${updateFieldName ? `Updated field: ${formData.updateField}` : '(no update field)'}
                (Old) password: ${formData.password}
        `);

        setFormData({
            updateField: '',
            password: ''
        });
    }


    function focusGuard(){  // along with the `.focus-guard` elements below, creates a closed loop when using the tab key to change focus within the modal
        $('input[tabindex="2"]').trigger('focus');
    }


    return <>
        <div className="modal fade" id={`${kebabify(type)}-modal`} tabIndex="-1" aria-labelledby={`${type} window`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title">{capitalize(type)}</h1>
                        <button type="button" className="btn-close" tabIndex={-1} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form
                            className='d-flex flex-column'
                            id={`${kebabify(type)}-form`}
                            onSubmit={handleFormSubmit}
                        >
                            <div className='focus-guard' tabIndex={1} onFocus={focusGuard}></div>
                            <div className={`form-elements-wrapper d-flex flex-wrap flex-column${updateFieldName === 'password' ? '-reverse' : ''}`}>
                                {updateFieldName ?
                                        <div className="form-floating">
                                            <input
                                                className="form-control"
                                                value={formData.updateField}
                                                onChange={handleFormChange}
                                                id={kebabify(type)}
                                                name="updateField"
                                                type={updateFieldName === 'username' ? 'text' : updateFieldName}
                                                placeholder={`Enter ${updateFieldName}`}
                                                tabIndex={updateFieldName === 'password' ? 3 : 2}
                                                required
                                                autoFocus
                                            />
                                            <label htmlFor={kebabify(type)}>New {updateFieldName}</label>
                                        </div>
                                    :
                                        <p>Enter password to confirm account deletion</p>
                                }
                                
                                <div className="form-floating">
                                    <input
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleFormChange}
                                        id={`${kebabify(type)}-verify-password`}
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        tabIndex={updateFieldName === 'password' ? 2 : 3}
                                        required
                                    />
                                    <label htmlFor={`${kebabify(type)}-verify-password`}>{updateFieldName === 'password' ? 'Old password' : 'Password'}</label>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                type="submit"
                                form={`${kebabify(type)}-form`}
                                tabIndex={4}
                            >
                                    {capitalize(type)}
                            </button>

                            <div className='focus-guard' tabIndex={5} onFocus={focusGuard}></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
}