import { currentUser } from '@clerk/nextjs';

export default async function Home() {
  const user = await currentUser();
  console.log(user)
  if (!user) return <div>Not logged in</div>;
  return <div>Hello {user?.firstName}</div>;
}