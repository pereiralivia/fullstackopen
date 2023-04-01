import { useUserValue } from '../contexts/UserContext';

const User = () => {
  const user = useUserValue();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex gap-1 font-medium text-gray-400">
        <div>{user.name} logged in</div>
      </div>
    </div>
  );
};

export default User;

