

const Profile = ()=>{
    return(
        <section>
            <h1>Profile settings</h1>

            <h2>Change name</h2>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" />
                <button type="button">Save Changes</button>
            </form>
            <h2>Change profile picture</h2>
            <form>
                <label htmlFor="image">Profile Picture</label>
                <input type="file" name="image" />
                <button type="button">Save Changes</button>
            </form>
            <h2>Change description</h2>
            <form>
                <label htmlFor="description">Change description</label>
                <input type="text" name="description" />
                <button type="button">Save Changes</button>
            </form>
        </section>
    )
}

export default Profile