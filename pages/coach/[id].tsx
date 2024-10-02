


import { useRouter } from 'next/router';

const Coach: React.FC = (props) => {
  const router = useRouter();
  const { id } = router.query; // Access the dynamic parameter

  return (
    <div>
      Coach Dashboard
      <h1>User ID: {id}</h1>
    </div>
  );
};

export default Coach