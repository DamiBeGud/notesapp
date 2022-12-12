

const PostAdded = (props)=>{
    const postPopUp= props.postPopUp
    const setPostPopUp = props.setPostPopUp
    
    return(
        <div>
            <h1>Posted</h1>
            <button type="button" onClick={()=>setPostPopUp(!postPopUp)}>OK</button>
        </div>
    )
}

export default PostAdded