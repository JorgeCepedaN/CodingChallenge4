export default function VehicleInfo ({ vehicles }) {
    return (
        <>
            {
                vehicles && (
                    vehicles.map((vehicle) => (
                        <tr>
                            <td> {vehicle.year} </td>
                            <td> {vehicle.make} </td>
                            <td> {vehicle.model} </td>
                        </tr>   
                    ))

                )
            }
        </>
    )
};