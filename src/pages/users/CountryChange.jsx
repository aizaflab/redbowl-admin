import CountryChangeTable from "../../components/table/CountryChangeTable/CountryChangeTable";
import TableLayout from "../../components/table/TableLayout";
import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";


export default function CountryChange() {
    return (
        <div>
            <Breadcrumb items={[{ path: '/', label: 'Home' }, { path: '/countrychnage', label: 'Country change' }]} />
            <TableLayout>
                <CountryChangeTable />
            </TableLayout>
        </div>
    )
}
