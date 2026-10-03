import { useEffect, useState, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../App/AppStore";
import { GetUsersFetch, UserCard, UsersHeader } from "../Entities/Users";




const Home: FC = () => {
    const { Users, maxPage, total, isSetUser } = useAppSelector(state => state.UsersSlice)
    const [page, setIsPage] = useState<number>(1)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isSetUser) {
            dispatch(GetUsersFetch(page))
        }
    }, [])

    return <div style={{ width: "40%", margin: "0px auto" }}>
        <UsersHeader total={total} />
        {Users.map(user => <UserCard user={user} />)}
    </div>
}


export default Home