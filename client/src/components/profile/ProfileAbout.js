const ProfileAbout = () => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">John's Bio</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed doloremque
        nesciunt, repellendus nostrum deleniti recusandae nobis neque modi
        perspiciatis similique?
      </p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        <div className="p-1">
          <i className="fa fa-check"></i> HTML
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> CSS
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> JavaScript
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> Python
        </div>
        <div className="p-1">
          <i className="fa fa-check"></i> C#
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
