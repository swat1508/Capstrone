
import React,{Fragment}from 'react';

const FormElementComponent =({formElementArray,changeValue})=>{
    return formElementArray.map((formObj,key)=>{
            if(formObj.type==="radio" || formObj.type==="checkbox"){
               return createRadioAndCheckbox(formObj,changeValue)
            }
            else if(formObj.type==="select"){
               return createSelectElement(formObj,changeValue);
            }
            else if(formObj.type==="textarea"){
                return createTextAreaElement(formObj,changeValue);
            }
            else{
               return createOtherFormInputElement(formObj,changeValue);
            }
    });

}

export default FormElementComponent;

const createRadioAndCheckbox=(formFieldObj,changeValue)=>{
    return (
        <Fragment>
            {formFieldObj.inputGroup.map((radioObj,key)=>{
                return (
                    <div className="form-check form-check-inline my-2" key={formFieldObj.id+"-"+key}>
                        <input type={formFieldObj.type} className={"form-check-input "+formFieldObj.classes}
                        name={formFieldObj.name} id={formFieldObj.id+"-"+key} 
                        value={radioObj.value} onClick={e=>changeValue(e)}/>
                    <label htmlFor={formFieldObj.id+"-"+key}  className="text-capitalize form-check-label">{radioObj.label}</label>
                    </div>
                )
            })}
            <div className={"form-field-err"+(formFieldObj.error?"":"d-none")}>{formFieldObj.error}</div>
        </Fragment>
    )
 }
 const createSelectElement=(formFieldObj,changeValue)=>{
    return (
        <Fragment>
            
        </Fragment>
    )
 }
 const createTextAreaElement=(formFieldObj,changeValue)=>{
    return (
        <Fragment>
            <div className="form-group">
                {formFieldObj.label?<label htmlFor={formFieldObj.id}  className="text-capitalize form-field-label">{formFieldObj.label}</label>:""}
                <textarea type={formFieldObj.type} className={"form-control "+formFieldObj.classes}
                name={formFieldObj.name} id={formFieldObj.id} 
                value={formFieldObj.value} cols={formFieldObj.col} 
                rows={formFieldObj.rows}
                placeholder={formFieldObj.placeholder} onChange={e=>changeValue(e)}></textarea>
            </div>
            <div className={"form-field-err"+(formFieldObj.error?"":"d-none")}>{formFieldObj.error}</div>
        </Fragment>
    )
 }
 const createOtherFormInputElement=(formFieldObj,changeValue)=>{
    return (
        <Fragment>
            <div className="form-group">
                {formFieldObj.label?<label htmlFor={formFieldObj.id}  className=" text-capitalize form-field-label">{formFieldObj.label}</label>:""}
                <input type={formFieldObj.type} className={"form-control "+formFieldObj.classes}
                name={formFieldObj.name} id={formFieldObj.id} 
                value={formFieldObj.value} placeholder={formFieldObj.placeholder} onChange={e=>changeValue(e)}/>
            </div>
            <div className={"form-field-err"+(formFieldObj.error?"":"d-none")}>{formFieldObj.error}</div>
        </Fragment>
    )
 }