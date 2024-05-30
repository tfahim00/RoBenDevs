import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-xs'>
        <button
          className="font-bold block w-full py-2 px-4 bg-slate-500 text-white rounded mb-2"
          onClick={() => navigate('/admin-sign-in')}
        >
          For Admin
        </button>
        <button
          className="font-bold block w-full py-2 px-4 bg-slate-700 text-white rounded"
          onClick={() => navigate('/employee-sign-in')}
        >
          For Employee
        </button>
      </div>
    </div>
  );
}
