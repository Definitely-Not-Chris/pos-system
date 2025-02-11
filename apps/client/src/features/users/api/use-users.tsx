import { useQuery } from "react-query";
import users from "../../../api/users";



export default function () {
    const { data } = useQuery('some-key', users.getOne)
    
}   