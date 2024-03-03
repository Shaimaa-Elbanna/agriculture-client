import FieldComponent from "../../components/FieldContent/FieldComponent"
import "../products/products.scss"

// import Single from "../../components/single/Single"
// import { singleProduct } from "../../data"

const ParentThree = () => {

  //Fetch data and send to Single Component
  return (
    <div className="product">
       <FieldComponent fieldName="F3" localStorageKeys={{ deviceName: "reportCurrentDeviceF3", deviceId: "selectedDeviceIDF3" }}  />
    </div>
  )
}

export default ParentThree