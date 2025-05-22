import { useMemo } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

export default function Breadcrumb() {

    const location = useLocation()

    const breadcrumbs = useMemo(() => {
        const pathnames = location.pathname.split("/").filter(Boolean)
        return pathnames.map((_, index) => {
            const to = "/" + pathnames.slice(0, index + 1).join("/")
            return { label: pathnames[index], to }
        })
    }, [location])
    return (
        <div className="p-4">
            <nav className="text-md text-gray-200 flex flex-wrap items-center space-x-1 font-medium">
                <Link to="/dashboard" className="text-gray-300 hover:underline">Dashboard</Link>

                {breadcrumbs.map((crumb, index) => (
                    <span key={crumb.to} className="flex items-center space-x-1">
                        <span className="mx-1 text-white">{'>'}</span>
                        
                            <span className="font-semibold text-white">{capitalize(crumb.label)}</span>
                        
                    </span>
                ))}
            </nav>

            <Outlet />
        </div>

    )
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}