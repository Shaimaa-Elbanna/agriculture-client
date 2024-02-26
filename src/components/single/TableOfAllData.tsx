import DataTable from '../dataTable/DataTable';
import { FormData, columns } from './tableData.interface';


export default function TableOfAllData(data: FormData) {
console.log("🚀 ~ TableOfAllData ~ data:", data)


  

    const modifiedData = data.data.map(obj => {
        const { _id, ...rest } = obj
        return { id: _id, ...rest }
    })

    return ( 
        <div className="products">
            <div className="info">
                <h1>Device data</h1>
            </div>

            <DataTable slug="Parameters " columns={columns} rows={modifiedData}/>

      
          
        </div>
    );
};

