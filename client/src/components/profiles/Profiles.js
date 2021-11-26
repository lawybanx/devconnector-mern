import ProfileItems from './ProfileItems';

const Profiles = () => {
  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">{<ProfileItems />}</div>
    </section>
  );
};

export default Profiles;
