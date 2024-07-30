// import { useState } from "react";
import Select from "react-select";
// import "./styles.css";
const customStyles = {
    menu: (provided: any, state: any) => ({
      ...provided,
      width: state.selectProps.width,
    //   borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 10,
      zIndex: '99999999999999'
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: '12px', // Adjust this value to change the font size
      cursor: 'pointer'
      // other styles you want to apply to the options
    }),
}


export default function SelectComponent({
  id,
    allOptions,
    // defaultValue,
    isMulti,
    getInitialDataBack = (e: any) => {
      return e
    }
}: {id:string,
  allOptions: any[] ,
  // defaultValue: number, 
  getInitialDataBack: (e: any) =>  void,
  isMulti?: boolean
} , 
) {
  function getDataBack(data: any){
    console.log('=== data backed ===', data)
    getInitialDataBack(data)
  }
  // console.log('=== defaultValue ===', defaultValue );
  
  return (
    <div className="select__menu">
      <Select
      id={id}
        // defaultValue={allOptions[0]}
        isMulti={isMulti}
        styles={customStyles}
        className="select__menu--data"
        // // closeMenuOnSelect={false}
        // // hideSelectedOptions={false}
        onChange={(option: any) => {
          
          console.log('=== options ===', option)
          getDataBack(option)
        }}
        options={allOptions}
        // components={{
        //   Option: SelectOptions
        // }}
      />
    </div>
  );
}
