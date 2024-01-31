
const UserProfile = ({params}:any) => {
  return (
  <div className="profile">
    <h1 className="text-white text-3xl">product <span className="bg-orange-300 ">{params.id}</span></h1>

  </div>
  )
}

export default UserProfile;