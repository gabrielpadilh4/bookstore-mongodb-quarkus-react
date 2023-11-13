import { ImExit } from "react-icons/im";

export default function LogoutButton ({keycloak}) {


    return (
        <div className="flex justify-end px-4 py-1 rounded-lg text-sky-600 hover:cursor-pointer" onClick={keycloak.logout}>
            <ImExit className="text-2xl"/> Logout
        </div>
    )
}