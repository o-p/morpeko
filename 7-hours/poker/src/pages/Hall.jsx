import {
  Link,
} from 'react-router-dom';

const Hall = () => {
  return (
    <div className="hall">
      <Link
        to="/room/Thunder"
        className="btn-link"
      >
        進入房間
      </Link>
    </div>
  )
}
export default Hall;
