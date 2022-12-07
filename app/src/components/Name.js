

const Name = (props)=>{
    const createUser = props.userInfo?.map(user=>{
        return(
            <h1>{user.name}</h1>
        )
    })
    return(
        {createUser}
    )
}
export default Name