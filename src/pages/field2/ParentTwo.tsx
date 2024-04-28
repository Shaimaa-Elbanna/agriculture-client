import FieldComponent from "../../components/FieldContent/FieldComponent"
import "../products/products.scss"

// import Single from "../../components/single/Single"
// import { singleProduct } from "../../data"

const ParentTwo = () => {

  //Fetch data and send to Single Component
  return (
    <div className="product">
       <FieldComponent fieldName="F2" localStorageKeys={{ deviceName: "reportCurrentDeviceF2", deviceId: "selectedDeviceIDF2" }}  />
    </div>
  )
}

export default ParentTwo