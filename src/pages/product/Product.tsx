import "./product.scss"

import Single from "../../components/single/Single"

const FieldOne = () => {

  //Fetch data and send to Single Component
  return (
    <div className="product">
       <Single />
    </div>
  )
}

export default FieldOne