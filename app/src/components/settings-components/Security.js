

const Security = ()=>{
    return(
        <section>
            <h1>Security settings</h1>

            <h2>Change email</h2>
            <form>
                <label htmlFor="oldEmail">Old email</label>
                <input type="email" name="oldEmail"/>
                <label htmlFor="email">New email</label>
                <input type="email" name="email"/>
                <label htmlFor="confirmEmail">Confirm new email</label>
                <input type="email" name="confirmEmail"/>               
                <button type="button">Save Changes</button>
            </form>
            <h2>Change password</h2>
            <form>
                <label htmlFor="oldPassword">Old password</label>
                <input type="password" name="oldPassword"/>
                <label htmlFor="password">New password</label>
                <input type="password" name="password"/>
                <label htmlFor="confirmPassword">Confirm new password</label>
                <input type="password" name="confirmPassword"/>               
                <button type="button">Save Changes</button>
            </form>
        </section>
    )
}

export default Security