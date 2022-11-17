
// IMPORTS
import $ from 'jquery';

import {useState} from 'react';

import {useStoreContext} from '../../../utils/GlobalState';

import {kebabify, capitalize, capitalizeEachWord} from '../../../utils/helpers';

import './index.css';



// COMPONENT
export default function AcctMngmntModal({type}){
    const [{filterState}] = useStoreContext();
    const boroughs = filterState
        .find(({group}) => group === 'borough')
        .elements.map(({name}) => name);

    let updateFieldName;
    switch (type){
        case 'update email':
            updateFieldName = 'email';
            break;
        case 'update username':
            updateFieldName = 'username';
            break;
        case 'update borough':
            updateFieldName = 'borough';  // UPDATE LATER: in the <select> below, make the default value the user's current borough
            break;
        case 'update password':
            updateFieldName = 'password';
            break;
        // 'delete account' is intentionally unaccounted for here
    }


    const [formData, setFormData] = useState({
        updateField: updateFieldName === 'borough' ? 'manhattan' : '',
        password: ''
    });


    function handleFormChange({target}){
        const updatedFormData = {...formData};

        updatedFormData[target.name] = target.value;

        setFormData(updatedFormData);
    }    

    
    function handleFormSubmit(e){  // UPDATE LATER
        e.preventDefault();

        if (updateFieldName !== 'password')
            formData.updateField = formData.updateField.trim();
        
        if ((!updateFieldName || formData.updateField) && formData.password){
            alert(`Type: ${type}
                Payload:
                    ${updateFieldName ? `Updated field: ${formData.updateField}` : '(no update field)'}
                    (Old) password: ${formData.password}
            `);

            setFormData({
                updateField: updateFieldName === 'borough' ? 'manhattan' : '',  // UPDATE LATER
                password: ''
            });
        }
    }


    function focusGuard(){  // along with the `.focus-guard` elements below, creates a closed loop when using the tab key to change focus within the modal
        $('input[tabindex="2"]').trigger('focus');
    }


    return <>
        <div className="acct-mngmnt-modal modal fade" id={`${kebabify(type)}-modal`} tabIndex="-1" aria-labelledby={`${type} window`} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{capitalize(type)}</h3>
                        <button type="button" className="btn-close" tabIndex={-1} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form
                            className='d-flex flex-column'
                            id={`${kebabify(type)}-form`}
                            onSubmit={handleFormSubmit}
                        >
                            <div className='focus-guard' tabIndex={1} onFocus={focusGuard}></div>
                            <div className={`form-fields-wrapper d-flex flex-wrap flex-column${updateFieldName === 'password' ? '-reverse' : ''} align-items-center`}>
                                {updateFieldName === 'borough' ?
                                    <div className='form-floating w-75 mb-2'>
                                        <select
                                            className='form-select form-select-sm'
                                            id='borough-selector'
                                            aria-label='borough selector'
                                            name='updateField'
                                            value={formData.updateField}
                                            onChange={handleFormChange}
                                            tabIndex='2'
                                        >
                                            {boroughs.map(borough => 
                                                <option value={borough} key={borough}>
                                                    {capitalizeEachWord(borough)}
                                                </option>
                                            )}
                                        </select>
                                        <label htmlFor='borough-selector'>Borough</label>
                                    </div>
                                : updateFieldName ?
                                    <div className="form-floating w-75 mb-2">
                                        <input
                                            className="form-control form-control-sm"
                                            value={formData.updateField}
                                            onChange={handleFormChange}
                                            id={kebabify(type)}
                                            name="updateField"
                                            type={updateFieldName === 'username' ? 'text' : updateFieldName}
                                            placeholder={`Enter ${updateFieldName}`}
                                            tabIndex={updateFieldName === 'password' ? 3 : 2}
                                            required
                                        />
                                        <label htmlFor={kebabify(type)}>New {updateFieldName}</label>
                                    </div>
                                :
                                    <p>Enter password to confirm account deletion</p>
                                }
                                
                                <div className="form-floating w-75 mb-2">
                                    <input
                                        className="form-control form-control-sm"
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
                                className={`btn mt-1 w-50 mx-auto hover-opacity`}
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