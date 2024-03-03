import "./product.scss"

import FieldComponent from "../../components/FieldContent/FieldComponent"

const Product = () => {

  //Fetch data and send to Single Component
  return (
    <div className="product">
       <FieldComponent fieldName="F1" localStorageKeys={{ deviceName: "reportCurrentDeviceF1", deviceId: "selectedDeviceIDF1" }}  />
    </div>
  )
}

export default Product