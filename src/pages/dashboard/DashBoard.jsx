import Breadcrumb from "../../components/ui/breadcrumb/Breadcrumb";

export default function DashBoard() {
    return (
        <div>
            <div className="flex items-center justify-between  bg-[#FE822C]/15 py-2 mt-7 rounded px-3">
                <h1 className="font-semibold">Add Property</h1>
                <Breadcrumb items={[{ path: '/', label: 'Home' }, { path: '/', label: 'Add Property' }]} />
            </div>
        </div>
    )
}
